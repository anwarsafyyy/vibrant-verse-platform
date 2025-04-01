import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { format } from "date-fns";
import { Eye, EyeOff, Search } from "lucide-react";
import type { Database } from "@/types/supabase";

type Inquiry = Database['public']['Tables']['contact_inquiries']['Row'];

const AdminPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const { toast } = useToast();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
      setAuthChecking(false);
    };
    
    checkAuth();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('contact_inquiries')
        .select('*', { count: 'exact' });
      
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,message.ilike.%${searchTerm}%`);
      }
      
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;
      
      const { data, count, error } = await query
        .order('created_at', { ascending: false })
        .range(from, to);
      
      if (error) throw error;
      
      setInquiries(data || []);
      if (count) {
        setTotalPages(Math.ceil(count / itemsPerPage));
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      toast({
        title: "Error",
        description: "Failed to fetch inquiries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchInquiries();
    }
  }, [isAuthenticated, currentPage, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchInquiries();
  };

  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .update({ is_read: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      setInquiries(inquiries.map(inquiry => 
        inquiry.id === id 
          ? { ...inquiry, is_read: !currentStatus } 
          : inquiry
      ));
      
      toast({
        title: "Success",
        description: `Marked as ${!currentStatus ? 'read' : 'unread'}`,
      });
    } catch (error) {
      console.error("Error updating read status:", error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Please check your credentials",
        variant: "destructive",
      });
    } finally {
      setLoginLoading(false);
    }
  };

  if (authChecking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-16 h-16 border-4 border-olu-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-xl shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
            <p className="text-muted-foreground mt-2">Sign in to access the admin panel</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full olu-gold-gradient"
              disabled={loginLoading}
            >
              {loginLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold olu-gold-text-gradient">Contact Inquiries</h1>
          
          <Button 
            onClick={async () => {
              await supabase.auth.signOut();
              setIsAuthenticated(false);
            }}
            variant="outline"
          >
            Sign out
          </Button>
        </div>
        
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <Input
            placeholder="Search by name, email or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
        
        {loading ? (
          <div className="flex justify-center my-12">
            <div className="w-12 h-12 border-4 border-olu-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg">
            <p className="text-xl text-muted-foreground">No inquiries found</p>
          </div>
        ) : (
          <>
            <div className="bg-card rounded-lg shadow overflow-hidden">
              <Table>
                <TableCaption>List of contact form submissions</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.map((inquiry) => (
                    <TableRow key={inquiry.id}>
                      <TableCell className="font-medium whitespace-nowrap">
                        {format(new Date(inquiry.created_at), 'dd MMM yyyy, HH:mm')}
                      </TableCell>
                      <TableCell>{inquiry.name}</TableCell>
                      <TableCell>
                        <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline">
                          {inquiry.email}
                        </a>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {inquiry.message}
                      </TableCell>
                      <TableCell>
                        <Badge variant={inquiry.is_read ? "outline" : "default"}>
                          {inquiry.is_read ? "Read" : "Unread"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleReadStatus(inquiry.id, inquiry.is_read)}
                        >
                          {inquiry.is_read ? (
                            <><EyeOff className="h-4 w-4 mr-2" /> Mark as Unread</>
                          ) : (
                            <><Eye className="h-4 w-4 mr-2" /> Mark as Read</>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={currentPage === page}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
