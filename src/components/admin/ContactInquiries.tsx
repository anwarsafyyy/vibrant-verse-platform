
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
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Eye, EyeOff, Search, Loader2 } from "lucide-react";
import type { Database } from "@/types/supabase";

type Inquiry = Database['public']['Tables']['contact_inquiries']['Row'];

const ContactInquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const itemsPerPage = 10;
  const { toast } = useToast();

  useEffect(() => {
    fetchInquiries();
  }, [currentPage, searchTerm]);

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
      
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, is_read: !currentStatus });
      }
      
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

  const viewInquiryDetails = async (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDetailOpen(true);
    
    // If it was unread, mark it as read
    if (!inquiry.is_read) {
      await toggleReadStatus(inquiry.id, false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Contact Inquiries</h2>
      
      <form onSubmit={handleSearch} className="flex gap-2">
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
      
      <div className="border rounded-md">
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : inquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No inquiries found.
                </TableCell>
              </TableRow>
            ) : (
              inquiries.map((inquiry) => (
                <TableRow key={inquiry.id} className={!inquiry.is_read ? "bg-muted/30" : ""}>
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
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewInquiryDetails(inquiry)}
                      >
                        <Eye className="h-4 w-4 mr-2" /> View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleReadStatus(inquiry.id, inquiry.is_read)}
                      >
                        {inquiry.is_read ? (
                          <><EyeOff className="h-4 w-4 mr-2" /> Mark Unread</>
                        ) : (
                          <><Eye className="h-4 w-4 mr-2" /> Mark Read</>
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
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
      
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
            <DialogDescription>
              Full details of the contact inquiry.
            </DialogDescription>
          </DialogHeader>
          
          {selectedInquiry && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">From:</h3>
                  <p>{selectedInquiry.name} (<a href={`mailto:${selectedInquiry.email}`} className="text-blue-600 hover:underline">{selectedInquiry.email}</a>)</p>
                </div>
                <div className="text-right">
                  <h3 className="font-medium">Date:</h3>
                  <p>{format(new Date(selectedInquiry.created_at), 'dd MMM yyyy, HH:mm:ss')}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium">Status:</h3>
                <Badge variant={selectedInquiry.is_read ? "outline" : "default"}>
                  {selectedInquiry.is_read ? "Read" : "Unread"}
                </Badge>
              </div>
              
              <div>
                <h3 className="font-medium">Message:</h3>
                <div className="border rounded-md p-4 mt-2 whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            {selectedInquiry && (
              <Button 
                variant="outline" 
                onClick={() => toggleReadStatus(selectedInquiry.id, selectedInquiry.is_read)}
              >
                {selectedInquiry.is_read ? (
                  <><EyeOff className="h-4 w-4 mr-2" /> Mark as Unread</>
                ) : (
                  <><Eye className="h-4 w-4 mr-2" /> Mark as Read</>
                )}
              </Button>
            )}
            <Button onClick={() => setIsDetailOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactInquiries;
