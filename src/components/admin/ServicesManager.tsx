
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
  Loader2
} from "lucide-react";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Database } from "@/types/supabase";

type Service = Database['public']['Tables']['services']['Row'];

const iconOptions = [
  { value: 'globe', label: 'Globe' },
  { value: 'code', label: 'Code' },
  { value: 'cpu', label: 'CPU' },
  { value: 'bar-chart', label: 'Bar Chart' },
];

const ServicesManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("globe");
  
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true });
        
      if (error) throw error;
      
      setServices(data || []);
    } catch (error: any) {
      console.error("Error fetching services:", error);
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async () => {
    if (!title || !description) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and description",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Get the highest order_index and add 1
      const maxOrderIndex = services.length > 0 
        ? Math.max(...services.map(s => s.order_index || 0)) 
        : -1;
      
      const { error } = await supabase
        .from('services')
        .insert({
          title,
          description,
          icon,
          order_index: maxOrderIndex + 1
        });
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Service added successfully",
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setIcon("globe");
      setIsAddDialogOpen(false);
      
      // Refresh list
      fetchServices();
    } catch (error: any) {
      console.error("Error adding service:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add service",
        variant: "destructive",
      });
    }
  };

  const handleEditService = async () => {
    if (!selectedService || !title || !description) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and description",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from('services')
        .update({
          title,
          description,
          icon
        })
        .eq('id', selectedService.id);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Service updated successfully",
      });
      
      // Reset form
      setSelectedService(null);
      setTitle("");
      setDescription("");
      setIcon("globe");
      setIsEditDialogOpen(false);
      
      // Refresh list
      fetchServices();
    } catch (error: any) {
      console.error("Error updating service:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update service",
        variant: "destructive",
      });
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Service deleted successfully",
      });
      
      // Refresh list
      fetchServices();
    } catch (error: any) {
      console.error("Error deleting service:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete service",
        variant: "destructive",
      });
    }
  };

  const handleMoveService = async (id: string, direction: 'up' | 'down') => {
    const index = services.findIndex(s => s.id === id);
    if (index === -1) return;
    
    // Can't move first item up or last item down
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === services.length - 1)) {
      return;
    }
    
    try {
      const currentService = services[index];
      const swapIndex = direction === 'up' ? index - 1 : index + 1;
      const swapService = services[swapIndex];
      
      // Swap order indices
      const { error: error1 } = await supabase
        .from('services')
        .update({ order_index: swapService.order_index })
        .eq('id', currentService.id);
        
      if (error1) throw error1;
      
      const { error: error2 } = await supabase
        .from('services')
        .update({ order_index: currentService.order_index })
        .eq('id', swapService.id);
        
      if (error2) throw error2;
      
      toast({
        title: "Success",
        description: "Service order updated",
      });
      
      // Refresh list
      fetchServices();
    } catch (error: any) {
      console.error("Error reordering services:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update order",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (service: Service) => {
    setSelectedService(service);
    setTitle(service.title);
    setDescription(service.description);
    setIcon(service.icon);
    setIsEditDialogOpen(true);
  };

  const getIconLabel = (value: string) => {
    const option = iconOptions.find(opt => opt.value === value);
    return option ? option.label : value;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Manage Services</h2>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>
                Add a new service to display on the services section.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Service Title</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Enter service title"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Enter service description"
                  rows={4}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="icon">Icon</Label>
                <Select value={icon} onValueChange={setIcon}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddService}>
                Add Service
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No services found. Add your first service.
                </TableCell>
              </TableRow>
            ) : (
              services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{getIconLabel(service.icon)}</TableCell>
                  <TableCell>{service.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{service.description}</TableCell>
                  <TableCell>{format(new Date(service.created_at), 'dd MMM yyyy')}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleMoveService(service.id, 'up')}
                        disabled={services.indexOf(service) === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleMoveService(service.id, 'down')}
                        disabled={services.indexOf(service) === services.length - 1}
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
                        onClick={() => openEditDialog(service)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteService(service.id)}
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
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Update service information.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Service Title</Label>
              <Input 
                id="edit-title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Enter service title"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea 
                id="edit-description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Enter service description"
                rows={4}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-icon">Icon</Label>
              <Select value={icon} onValueChange={setIcon}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditService}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesManager;
