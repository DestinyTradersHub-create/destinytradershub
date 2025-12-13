import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  TrendingUp,
  LogOut,
  Loader2,
  Mail,
  Phone,
  Calendar,
  User,
  MessageSquare,
  RefreshCw,
  ShieldAlert,
  Inbox,
} from 'lucide-react';
import { format } from 'date-fns';

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
}

const Admin = () => {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);

  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.message.includes('row-level security')) {
          // Not an admin - this is expected
          setInquiries([]);
        } else {
          console.error('Error fetching inquiries:', error);
          toast({
            title: 'Error',
            description: 'Failed to load contact inquiries.',
            variant: 'destructive',
          });
        }
      } else {
        setInquiries(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoadingData(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (user && isAdmin) {
      fetchInquiries();
    } else if (user && !loading) {
      setIsLoadingData(false);
    }
  }, [user, isAdmin, loading]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchInquiries();
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign out.',
        variant: 'destructive',
      });
    } else {
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Not an admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border/50 bg-card/50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">Admin Portal</span>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <ShieldAlert className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
            <p className="text-muted-foreground mb-6">
              You don't have admin privileges to view contact inquiries. Please contact an existing admin to grant you access.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Logged in as: <span className="text-foreground">{user.email}</span>
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate('/')}>
                Back to Home
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user.email}
            </span>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="glass rounded-xl p-6 border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Inbox className="w-5 h-5 text-primary" />
                Contact Inquiries
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
            <p className="text-muted-foreground">
              Total inquiries: <span className="text-foreground font-medium">{inquiries.length}</span>
            </p>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl border border-border/50 overflow-hidden"
        >
          {isLoadingData ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : inquiries.length === 0 ? (
            <div className="text-center py-16">
              <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No contact inquiries yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="font-semibold">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Name
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Message
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.map((inquiry) => (
                    <TableRow
                      key={inquiry.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedInquiry(inquiry)}
                    >
                      <TableCell className="font-medium">{inquiry.name}</TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="text-primary hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {inquiry.email}
                        </a>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {inquiry.phone ? (
                          <a
                            href={`tel:${inquiry.phone}`}
                            className="text-primary hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {inquiry.phone}
                          </a>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell max-w-xs">
                        <p className="truncate">{inquiry.message}</p>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {format(new Date(inquiry.created_at), 'MMM d, yyyy')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </motion.div>

        {/* Detail Modal */}
        {selectedInquiry && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedInquiry(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-xl p-6 border border-border/50 max-w-lg w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-foreground mb-4">Inquiry Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Name
                  </label>
                  <p className="text-foreground font-medium">{selectedInquiry.name}</p>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="text-primary hover:underline"
                  >
                    {selectedInquiry.email}
                  </a>
                </div>

                {selectedInquiry.phone && (
                  <div>
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone
                    </label>
                    <a
                      href={`tel:${selectedInquiry.phone}`}
                      className="text-primary hover:underline"
                    >
                      {selectedInquiry.phone}
                    </a>
                  </div>
                )}

                <div>
                  <label className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date
                  </label>
                  <p className="text-foreground">
                    {format(new Date(selectedInquiry.created_at), 'MMMM d, yyyy h:mm a')}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </label>
                  <p className="text-foreground whitespace-pre-wrap mt-1 p-3 bg-muted/30 rounded-lg">
                    {selectedInquiry.message}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  className="flex-1"
                  onClick={() => window.location.href = `mailto:${selectedInquiry.email}`}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Reply via Email
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedInquiry(null)}
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
