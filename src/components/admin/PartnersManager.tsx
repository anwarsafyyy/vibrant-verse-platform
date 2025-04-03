
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Loader2
} from "lucide-react";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import type { Database } from "@/types/supabase";

type Partner = Database['public']['Tables']['partners']['Row'];

const PartnersManager = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [uploading, setUploading] = useState(false);
  
  // Form states
  const [name, setName] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  
  const { toast } = useToast();

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('order_index', { ascending: true });
        
      if (error) throw error;
      
      setPartners(data || []);
    } catch (error: any) {
      console.error("Error fetching partners:", error);
      toast({
        title: "Error",
        description: "Failed to load partners",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setLogoFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const uploadLogo = async (file: File): Promise<string> => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('partners')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage
        .from('partners')
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    } catch (error: any) {
      console.error("Error uploading logo:", error);
      toast({
        title: "Upload Error",
        description: error.message || "Failed to upload logo",
        variant: "destructive",
      });
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleAddPartner = async () => {
    if (!name) {
      toast({
        title: "Missing Information",
        description: "Please provide a partner name",
        variant: "destructive",
      });
      return;
    }
    
    try {
      let finalLogoUrl = logoUrl;
      
      if (logoFile) {
        finalLogoUrl = await uploadLogo(logoFile);
      }
      
      if (!finalLogoUrl) {
        toast({
          title: "Missing Logo",
          description: "Please upload a logo or provide a URL",
          variant: "destructive",
        });
        return;
      }
      
      // Get the highest order_index and add 1
      const maxOrderIndex = partners.length > 0 
        ? Math.max(...partners.map(p => p.order_index || 0)) 
        : -1;
      
      const { error } = await supabase
        .from('partners')
        .insert({
          name,
          logo_url: finalLogoUrl,
          order_index: maxOrderIndex + 1
        });
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Partner added successfully",
      });
      
      // Reset form
      setName("");
      setLogoFile(null);
      setLogoUrl("");
      setLogoPreview("");
      setIsAddDialogOpen(false);
      
      // Refresh list
      fetchPartners();
    } catch (error: any) {
      console.error("Error adding partner:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add partner",
        variant: "destructive",
      });
    }
  };

  const handleEditPartner = async () => {
    if (!selectedPartner || !name) {
      toast({
        title: "Missing Information",
        description: "Please provide a partner name",
        variant: "destructive",
      });
      return;
    }
    
    try {
      let finalLogoUrl = logoUrl;
      
      if (logoFile) {
        finalLogoUrl = await uploadLogo(logoFile);
      } else if (!logoUrl) {
        finalLogoUrl = selectedPartner.logo_url;
      }
      
      const { error } = await supabase
        .from('partners')
        .update({
          name,
          logo_url: finalLogoUrl
        })
        .eq('id', selectedPartner.id);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Partner updated successfully",
      });
      
      // Reset form
      setSelectedPartner(null);
      setName("");
      setLogoFile(null);
      setLogoUrl("");
      setLogoPreview("");
      setIsEditDialogOpen(false);
      
      // Refresh list
      fetchPartners();
    } catch (error: any) {
      console.error("Error updating partner:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update partner",
        variant: "destructive",
      });
    }
  };

  const handleDeletePartner = async (id: string) => {
    if (!confirm("Are you sure you want to delete this partner?")) return;
    
    try {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Partner deleted successfully",
      });
      
      // Refresh list
      fetchPartners();
    } catch (error: any) {
      console.error("Error deleting partner:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete partner",
        variant: "destructive",
      });
    }
  };

  const handleMovePartner = async (id: string, direction: 'up' | 'down') => {
    const index = partners.findIndex(p => p.id === id);
    if (index === -1) return;
    
    // Can't move first item up or last item down
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === partners.length - 1)) {
      return;
    }
    
    try {
      const currentPartner = partners[index];
      const swapIndex = direction === 'up' ? index - 1 : index + 1;
      const swapPartner = partners[swapIndex];
      
      // Swap order indices
      const { error: error1 } = await supabase
        .from('partners')
        .update({ order_index: swapPartner.order_index })
        .eq('id', currentPartner.id);
        
      if (error1) throw error1;
      
      const { error: error2 } = await supabase
        .from('partners')
        .update({ order_index: currentPartner.order_index })
        .eq('id', swapPartner.id);
        
      if (error2) throw error2;
      
      toast({
        title: "Success",
        description: "Partner order updated",
      });
      
      // Refresh list
      fetchPartners();
    } catch (error: any) {
      console.error("Error reordering partners:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update order",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (partner: Partner) => {
    setSelectedPartner(partner);
    setName(partner.name);
    setLogoUrl(partner.logo_url);
    setLogoPreview(partner.logo_url);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Manage Partners</h2>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Partner
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Partner</DialogTitle>
              <DialogDescription>
                Add a new partner to display on the partners section.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Partner Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Enter partner name"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="logo">Logo</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="mb-2"
                    />
                    <p className="text-sm text-muted-foreground">or</p>
                    <Input 
                      placeholder="Logo URL" 
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div className="flex items-center justify-center border rounded-md overflow-hidden h-[100px]">
                    {logoPreview ? (
                      <img 
                        src={logoPreview} 
                        alt="Logo Preview" 
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
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPartner} disabled={uploading}>
                {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Partner
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : partners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  No partners found. Add your first partner.
                </TableCell>
              </TableRow>
            ) : (
              partners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>
                    <div className="h-12 w-12 flex items-center justify-center border rounded overflow-hidden">
                      <img 
                        src={partner.logo_url} 
                        alt={`${partner.name} logo`} 
                        className="max-h-full max-w-full object-contain" 
                      />
                    </div>
                  </TableCell>
                  <TableCell>{partner.name}</TableCell>
                  <TableCell>{format(new Date(partner.created_at), 'dd MMM yyyy')}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleMovePartner(partner.id, 'up')}
                        disabled={partners.indexOf(partner) === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleMovePartner(partner.id, 'down')}
                        disabled={partners.indexOf(partner) === partners.length - 1}
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
                        onClick={() => openEditDialog(partner)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeletePartner(partner.id)}
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Partner</DialogTitle>
            <DialogDescription>
              Update partner information.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Partner Name</Label>
              <Input 
                id="edit-name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter partner name"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-logo">Logo</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    id="edit-logo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mb-2"
                  />
                  <p className="text-sm text-muted-foreground">or</p>
                  <Input 
                    placeholder="Logo URL" 
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div className="flex items-center justify-center border rounded-md overflow-hidden h-[100px]">
                  {logoPreview ? (
                    <img 
                      src={logoPreview} 
                      alt="Logo Preview" 
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
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPartner} disabled={uploading}>
              {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PartnersManager;
