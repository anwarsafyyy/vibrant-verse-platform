
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Pencil, 
  Trash2, 
  Plus, 
  ArrowUp, 
  ArrowDown,
  ImagePlus,
  Loader2,
  X
} from "lucide-react";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/types/supabase";

type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];

const PortfolioManager = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [uploading, setUploading] = useState(false);
  
  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");
  
  const { toast } = useToast();

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('order_index', { ascending: true });
        
      if (error) throw error;
      
      setPortfolioItems(data || []);
    } catch (error: any) {
      console.error("Error fetching portfolio items:", error);
      toast({
        title: "Error",
        description: "Failed to load portfolio items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async (file: File): Promise<string> => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload Error",
        description: error.message || "Failed to upload image",
        variant: "destructive",
      });
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const addTechnology = () => {
    if (!techInput.trim()) return;
    if (!technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
    }
    setTechInput("");
  };

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter(t => t !== tech));
  };

  const handleAddPortfolioItem = async () => {
    if (!title || !category || !description || technologies.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      let finalImageUrl = imageUrl;
      
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      }
      
      if (!finalImageUrl) {
        toast({
          title: "Missing Image",
          description: "Please upload an image or provide a URL",
          variant: "destructive",
        });
        return;
      }
      
      // Get the highest order_index and add 1
      const maxOrderIndex = portfolioItems.length > 0 
        ? Math.max(...portfolioItems.map(p => p.order_index || 0)) 
        : -1;
      
      const { error } = await supabase
        .from('portfolio_items')
        .insert({
          title,
          category,
          description,
          image_url: finalImageUrl,
          technologies,
          order_index: maxOrderIndex + 1
        });
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Portfolio item added successfully",
      });
      
      // Reset form
      resetForm();
      setIsAddDialogOpen(false);
      
      // Refresh list
      fetchPortfolioItems();
    } catch (error: any) {
      console.error("Error adding portfolio item:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add portfolio item",
        variant: "destructive",
      });
    }
  };

  const handleEditPortfolioItem = async () => {
    if (!selectedItem || !title || !category || !description || technologies.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      let finalImageUrl = imageUrl;
      
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      } else if (!imageUrl) {
        finalImageUrl = selectedItem.image_url;
      }
      
      const { error } = await supabase
        .from('portfolio_items')
        .update({
          title,
          category,
          description,
          image_url: finalImageUrl,
          technologies
        })
        .eq('id', selectedItem.id);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Portfolio item updated successfully",
      });
      
      // Reset form
      resetForm();
      setSelectedItem(null);
      setIsEditDialogOpen(false);
      
      // Refresh list
      fetchPortfolioItems();
    } catch (error: any) {
      console.error("Error updating portfolio item:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update portfolio item",
        variant: "destructive",
      });
    }
  };

  const handleDeletePortfolioItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this portfolio item?")) return;
    
    try {
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Portfolio item deleted successfully",
      });
      
      // Refresh list
      fetchPortfolioItems();
    } catch (error: any) {
      console.error("Error deleting portfolio item:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete portfolio item",
        variant: "destructive",
      });
    }
  };

  const handleMovePortfolioItem = async (id: string, direction: 'up' | 'down') => {
    const index = portfolioItems.findIndex(p => p.id === id);
    if (index === -1) return;
    
    // Can't move first item up or last item down
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === portfolioItems.length - 1)) {
      return;
    }
    
    try {
      const currentItem = portfolioItems[index];
      const swapIndex = direction === 'up' ? index - 1 : index + 1;
      const swapItem = portfolioItems[swapIndex];
      
      // Swap order indices
      const { error: error1 } = await supabase
        .from('portfolio_items')
        .update({ order_index: swapItem.order_index })
        .eq('id', currentItem.id);
        
      if (error1) throw error1;
      
      const { error: error2 } = await supabase
        .from('portfolio_items')
        .update({ order_index: currentItem.order_index })
        .eq('id', swapItem.id);
        
      if (error2) throw error2;
      
      toast({
        title: "Success",
        description: "Portfolio item order updated",
      });
      
      // Refresh list
      fetchPortfolioItems();
    } catch (error: any) {
      console.error("Error reordering portfolio items:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update order",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (item: PortfolioItem) => {
    setSelectedItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setDescription(item.description);
    setImageUrl(item.image_url);
    setImagePreview(item.image_url);
    setTechnologies([...item.technologies]);
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setImageFile(null);
    setImageUrl("");
    setImagePreview("");
    setTechnologies([]);
    setTechInput("");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Manage Portfolio</h2>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Portfolio Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Portfolio Item</DialogTitle>
              <DialogDescription>
                Add a new project to your portfolio.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Project Title*</Label>
                  <Input 
                    id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Enter project title"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="category">Category*</Label>
                  <Input 
                    id="category" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    placeholder="e.g., Web Development"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description*</Label>
                <Textarea 
                  id="description" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Describe your project"
                  rows={3}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="technologies">Technologies*</Label>
                <div className="flex gap-2">
                  <Input 
                    id="technologies" 
                    value={techInput} 
                    onChange={(e) => setTechInput(e.target.value)} 
                    placeholder="Add technology"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTechnology();
                      }
                    }}
                  />
                  <Button type="button" onClick={addTechnology}>Add</Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {technologies.map((tech, index) => (
                    <Badge key={index} className="flex items-center gap-1">
                      {tech}
                      <button 
                        type="button" 
                        onClick={() => removeTechnology(tech)}
                        className="text-xs ml-1 hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="image">Project Image*</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="mb-2"
                    />
                    <p className="text-sm text-muted-foreground">or</p>
                    <Input 
                      placeholder="Image URL" 
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div className="flex items-center justify-center border rounded-md overflow-hidden h-[120px]">
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Image Preview" 
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <ImagePlus className="h-10 w-10 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                resetForm();
                setIsAddDialogOpen(false);
              }}>
                Cancel
              </Button>
              <Button onClick={handleAddPortfolioItem} disabled={uploading}>
                {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Portfolio Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Technologies</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : portfolioItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  No portfolio items found. Add your first project.
                </TableCell>
              </TableRow>
            ) : (
              portfolioItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="h-16 w-24 flex items-center justify-center border rounded overflow-hidden">
                      <img 
                        src={item.image_url} 
                        alt={item.title} 
                        className="max-h-full max-w-full object-cover" 
                      />
                    </div>
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {item.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleMovePortfolioItem(item.id, 'up')}
                        disabled={portfolioItems.indexOf(item) === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleMovePortfolioItem(item.id, 'down')}
                        disabled={portfolioItems.indexOf(item) === portfolioItems.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => openEditDialog(item)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeletePortfolioItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Portfolio Item</DialogTitle>
            <DialogDescription>
              Update portfolio item information.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Project Title*</Label>
                <Input 
                  id="edit-title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Enter project title"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category*</Label>
                <Input 
                  id="edit-category" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  placeholder="e.g., Web Development"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description*</Label>
              <Textarea 
                id="edit-description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Describe your project"
                rows={3}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-technologies">Technologies*</Label>
              <div className="flex gap-2">
                <Input 
                  id="edit-technologies" 
                  value={techInput} 
                  onChange={(e) => setTechInput(e.target.value)} 
                  placeholder="Add technology"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTechnology();
                    }
                  }}
                />
                <Button type="button" onClick={addTechnology}>Add</Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {technologies.map((tech, index) => (
                  <Badge key={index} className="flex items-center gap-1">
                    {tech}
                    <button 
                      type="button" 
                      onClick={() => removeTechnology(tech)}
                      className="text-xs ml-1 hover:text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-image">Project Image*</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    id="edit-image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mb-2"
                  />
                  <p className="text-sm text-muted-foreground">or</p>
                  <Input 
                    placeholder="Image URL" 
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div className="flex items-center justify-center border rounded-md overflow-hidden h-[120px]">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Image Preview" 
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <ImagePlus className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              resetForm();
              setSelectedItem(null);
              setIsEditDialogOpen(false);
            }}>
              Cancel
            </Button>
            <Button onClick={handleEditPortfolioItem} disabled={uploading}>
              {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioManager;
