
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
  Loader2,
  Users,
  Award,
  Clock,
  Globe,
  BarChart
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StatItem {
  id: string;
  name: string;
  value: string;
  icon: string;
  order_index: number;
  created_at: string;
}

const StatsManager = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStat, setSelectedStat] = useState<StatItem | null>(null);
  
  // Form states
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [icon, setIcon] = useState("users");
  
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('stats')
        .select('*')
        .order('order_index', { ascending: true });
        
      if (error) throw error;
      
      setStats(data || []);
    } catch (error: any) {
      console.error("Error fetching stats:", error);
      toast({
        title: "Error",
        description: "Failed to load statistics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddStat = async () => {
    if (!name || !value) {
      toast({
        title: "معلومات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Authentication required');
      }
      
      // Get the highest order_index and add 1
      const maxOrderIndex = stats.length > 0 
        ? Math.max(...stats.map(p => p.order_index || 0)) 
        : -1;
      
      const { error } = await supabase
        .from('stats')
        .insert({
          name,
          value,
          icon,
          order_index: maxOrderIndex + 1
        });
        
      if (error) throw error;
      
      toast({
        title: "نجح الحفظ",
        description: "تم إضافة الإحصائية بنجاح",
      });
      
      // Reset form
      resetForm();
      setIsAddDialogOpen(false);
      
      // Refresh list
      fetchStats();
    } catch (error: any) {
      console.error("Error adding statistic:", error);
      toast({
        title: "خطأ",
        description: error.message || "فشل في إضافة الإحصائية",
        variant: "destructive",
      });
    }
  };

  const handleEditStat = async () => {
    if (!selectedStat || !name || !value) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from('stats')
        .update({
          name,
          value,
          icon
        })
        .eq('id', selectedStat.id);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Statistic updated successfully",
      });
      
      // Reset form
      resetForm();
      setSelectedStat(null);
      setIsEditDialogOpen(false);
      
      // Refresh list
      fetchStats();
    } catch (error: any) {
      console.error("Error updating statistic:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update statistic",
        variant: "destructive",
      });
    }
  };

  const handleDeleteStat = async (id: string) => {
    if (!confirm("Are you sure you want to delete this statistic?")) return;
    
    try {
      const { error } = await supabase
        .from('stats')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Statistic deleted successfully",
      });
      
      // Refresh list
      fetchStats();
    } catch (error: any) {
      console.error("Error deleting statistic:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete statistic",
        variant: "destructive",
      });
    }
  };

  const handleMoveStat = async (id: string, direction: 'up' | 'down') => {
    const index = stats.findIndex(p => p.id === id);
    if (index === -1) return;
    
    // Can't move first item up or last item down
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === stats.length - 1)) {
      return;
    }
    
    try {
      const currentItem = stats[index];
      const swapIndex = direction === 'up' ? index - 1 : index + 1;
      const swapItem = stats[swapIndex];
      
      // Swap order indices
      const { error: error1 } = await supabase
        .from('stats')
        .update({ order_index: swapItem.order_index })
        .eq('id', currentItem.id);
        
      if (error1) throw error1;
      
      const { error: error2 } = await supabase
        .from('stats')
        .update({ order_index: currentItem.order_index })
        .eq('id', swapItem.id);
        
      if (error2) throw error2;
      
      toast({
        title: "Success",
        description: "Statistic order updated",
      });
      
      // Refresh list
      fetchStats();
    } catch (error: any) {
      console.error("Error reordering statistics:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update order",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (stat: StatItem) => {
    setSelectedStat(stat);
    setName(stat.name);
    setValue(stat.value);
    setIcon(stat.icon);
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setName("");
    setValue("");
    setIcon("users");
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Users className="h-4 w-4" />;
      case 'award':
        return <Award className="h-4 w-4" />;
      case 'clock':
        return <Clock className="h-4 w-4" />;
      case 'globe':
        return <Globe className="h-4 w-4" />;
      default:
        return <BarChart className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Manage Statistics</h2>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Statistic
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Statistic</DialogTitle>
              <DialogDescription>
                Add a new statistic for the About section.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name*</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="e.g., Satisfied Clients"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="value">Value*</Label>
                <Input 
                  id="value" 
                  value={value} 
                  onChange={(e) => setValue(e.target.value)} 
                  placeholder="e.g., 100+"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="icon">Icon</Label>
                <Select value={icon} onValueChange={setIcon}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="users">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Users
                      </div>
                    </SelectItem>
                    <SelectItem value="award">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-2" />
                        Award
                      </div>
                    </SelectItem>
                    <SelectItem value="clock">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Clock
                      </div>
                    </SelectItem>
                    <SelectItem value="globe">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        Globe
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                resetForm();
                setIsAddDialogOpen(false);
              }}>
                Cancel
              </Button>
              <Button onClick={handleAddStat}>
                Add Statistic
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
              <TableHead>Name</TableHead>
              <TableHead>Value</TableHead>
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
            ) : stats.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  No statistics found. Add your first statistic.
                </TableCell>
              </TableRow>
            ) : (
              stats.map((stat) => (
                <TableRow key={stat.id}>
                  <TableCell>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                      {getIconComponent(stat.icon)}
                    </div>
                  </TableCell>
                  <TableCell>{stat.name}</TableCell>
                  <TableCell>{stat.value}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleMoveStat(stat.id, 'up')}
                        disabled={stats.indexOf(stat) === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleMoveStat(stat.id, 'down')}
                        disabled={stats.indexOf(stat) === stats.length - 1}
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
                        onClick={() => openEditDialog(stat)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteStat(stat.id)}
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
            <DialogTitle>Edit Statistic</DialogTitle>
            <DialogDescription>
              Update statistic information.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name*</Label>
              <Input 
                id="edit-name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="e.g., Satisfied Clients"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-value">Value*</Label>
              <Input 
                id="edit-value" 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                placeholder="e.g., 100+"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-icon">Icon</Label>
              <Select value={icon} onValueChange={setIcon}>
                <SelectTrigger id="edit-icon">
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="users">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Users
                    </div>
                  </SelectItem>
                  <SelectItem value="award">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      Award
                    </div>
                  </SelectItem>
                  <SelectItem value="clock">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Clock
                    </div>
                  </SelectItem>
                  <SelectItem value="globe">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      Globe
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              resetForm();
              setSelectedStat(null);
              setIsEditDialogOpen(false);
            }}>
              Cancel
            </Button>
            <Button onClick={handleEditStat}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StatsManager;
