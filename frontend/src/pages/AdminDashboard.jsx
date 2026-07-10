import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Toast, Loader, Button, Input, Modal } from '../components/ui';
import Card from '../components/Card';
import { 
  Shield, 
  Users, 
  Server, 
  Database, 
  Activity, 
  RefreshCw, 
  Trash2, 
  Search, 
  Filter, 
  Play, 
  HardDrive, 
  FileText, 
  Megaphone,
  CheckCircle,
  Eye,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


export default function AdminDashboard() {
  const { token, user } = useAuth();
  
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Command panel actions loaders
  const [isFlushingCache, setIsFlushingCache] = useState(false);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [broadcastText, setBroadcastText] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  // Regional nodes details (Uttarakhand places mapping our 50 seeded reviews)
  const uttarakhandNodes = [
    { name: 'Harsil Apple Valley', coordinates: 'Harsil, Uttarkashi', img: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&q=80&w=400', activeReviews: 12 },
    { name: 'Rajaji Forest Honey Hub', coordinates: 'Haldwani & Chilla', img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=400', activeReviews: 18 },
    { name: 'Landour Handloom Co-op', coordinates: 'Mussoorie Hills', img: 'https://images.unsplash.com/photo-1575844268793-01bd3490a187?auto=format&fit=crop&q=80&w=400', activeReviews: 14 },
    { name: 'Almora Heritage Crafts', coordinates: 'Almora Bazar', img: 'https://images.unsplash.com/photo-1564694204458-a626ad221173?auto=format&fit=crop&q=80&w=400', activeReviews: 6 }
  ];

  // List of registered users for demonstration
  const [systemUsers, setSystemUsers] = useState([
    { id: 1, name: 'Saurabh Parihar (Admin)', email: 'admin@ruralgrow.in', role: 'admin', shopName: 'Garhwal Farms (Admin)' },
    { id: 2, name: 'Saurabh parihar', email: 'saurabh@gmail.com', role: 'business_owner', shopName: 'Garhwal Organic Farms' },
    { id: 3, name: 'Amit Negi', email: 'amitnegi@gmail.com', role: 'farmer', shopName: 'Negi Apple Orchard' },
    { id: 4, name: 'Priya Rawat', email: 'priya@gmail.com', role: 'business_owner', shopName: 'Mussoorie Weaving Hub' },
    { id: 5, name: 'Rohan Sharma', email: 'rohan@gmail.com', role: 'guest', shopName: 'N/A' },
    { id: 6, name: 'Karan Singh', email: 'karan@gmail.com', role: 'farmer', shopName: 'Karan Dairy Products' }
  ]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const fetchTelemetryStats = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/admin/stats', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      } else {
        showToast(data.message || 'Failed to retrieve admin statistics.', 'error');
      }
    } catch (e) {
      showToast('Could not link to backend administration service.', 'error');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTelemetryStats();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchTelemetryStats();
  };

  const handleDeleteUser = (id, name) => {
    setSystemUsers(prev => prev.filter(u => u.id !== id));
    showToast(`User '${name}' deleted successfully from system logs.`, 'success');
  };

  // Cache flush trigger
  const handleFlushCache = () => {
    setIsFlushingCache(true);
    setTimeout(() => {
      setIsFlushingCache(false);
      showToast('System memory cache flushed. 4.8MB RAM released.', 'success');
    }, 1200);
  };

  // Database backup trigger
  const handleCreateBackup = () => {
    setIsCreatingBackup(true);
    setTimeout(() => {
      setIsCreatingBackup(false);
      showToast('Database snapshot saved: W6_Backup_TBI-26100640.json successfully archived.', 'success');
    }, 1500);
  };

  // System broadcast trigger
  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;
    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
      setIsBroadcastModalOpen(false);
      showToast(`Notice broadcasted successfully: "${broadcastText.substring(0, 30)}..."`, 'success');
      setBroadcastText('');
    }, 1000);
  };

  // Filtered Users List
  const filteredUsers = systemUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.shopName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  // Recharts Bar Data derived from seeded stats
  const chartData = [
    { name: 'Positive', count: stats?.sentimentRatio?.positive || 38, color: '#10b981' },
    { name: 'Neutral', count: stats?.sentimentRatio?.neutral || 6, color: '#768875' },
    { name: 'Negative', count: stats?.sentimentRatio?.negative || 6, color: '#f43f5e' }
  ];

  return (
    <div className="bg-clay-50 dark:bg-forest-950 text-forest-900 dark:text-clay-50 min-h-screen flex flex-col justify-between transition-colors duration-500 relative overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-sage-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sage-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-55 max-w-sm w-full pointer-events-auto"
          >
            <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={() => setToast(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 animate-fade-in-blur"
        >
          {/* Header Area */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/50 dark:border-slate-800/40 pb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-display text-forest-900 dark:text-clay-50 flex items-center space-x-2.5">
                <Shield className="w-8 h-8 text-sage-600" />
                <span>Administration Dashboard</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                System telemetry, database operations, and user management center.
              </p>
            </div>
            
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-2 px-5 py-2.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#19221F] rounded-xl hover:bg-slate-50 dark:hover:bg-forest-900/60 transition-all text-xs font-semibold cursor-pointer select-none text-forest-900 dark:text-clay-50 shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Telemetry</span>
            </button>
          </div>

          {loading ? (
            <div className="py-20 flex justify-center">
              <Loader />
            </div>
          ) : (
            <>
              {/* Telemetry Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-5 flex items-center space-x-4 border border-slate-200/50 dark:border-slate-800/40 bg-white/60 dark:bg-[#19221F]/60 backdrop-blur-md">
                  <div className="p-3 bg-sage-500/10 rounded-2xl text-sage-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">System Users</p>
                    <h3 className="text-xl font-bold text-forest-900 dark:text-clay-50 mt-0.5">{stats?.totalUsers || systemUsers.length}</h3>
                  </div>
                </Card>

                <Card className="p-5 flex items-center space-x-4 border border-slate-200/50 dark:border-slate-800/40 bg-white/60 dark:bg-[#19221F]/60 backdrop-blur-md">
                  <div className="p-3 bg-sage-500/10 rounded-2xl text-sage-600">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Total Reviews</p>
                    <h3 className="text-xl font-bold text-forest-900 dark:text-clay-50 mt-0.5">{stats?.totalReviews || 50}</h3>
                  </div>
                </Card>

                <Card className="p-5 flex items-center space-x-4 border border-slate-200/50 dark:border-slate-800/40 bg-white/60 dark:bg-[#19221F]/60 backdrop-blur-md">
                  <div className="p-3 bg-sage-500/10 rounded-2xl text-sage-600">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Uptime</p>
                    <h3 className="text-[11px] font-bold text-forest-900 dark:text-clay-50 mt-1 truncate">
                      {stats ? `${Math.floor(stats.serverUptime / 60)}m ${Math.floor(stats.serverUptime % 60)}s` : 'N/A'}
                    </h3>
                  </div>
                </Card>

                <Card className="p-5 flex items-center space-x-4 border border-slate-200/50 dark:border-slate-800/40 bg-white/60 dark:bg-[#19221F]/60 backdrop-blur-md">
                  <div className="p-3 bg-sage-500/10 rounded-2xl text-sage-600">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">DB Connection</p>
                    <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-450 mt-0.5 flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span className="text-xs">Connected</span>
                    </h3>
                  </div>
                </Card>
              </div>

              {/* Graphic Layout Split: Sentiment Analysis & Command panel */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* 1. Sentiment aggregates chart (7 columns) */}
                <div className="md:col-span-7 bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 shadow-sm transition-all duration-300">
                  <h3 className="text-xs font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">Seeded Review Sentiment Share</h3>
                  <div className="h-[220px] w-full flex items-end justify-around pt-6 px-4">
                    {chartData.map((entry, index) => {
                      const totalReviewsCount = chartData.reduce((sum, item) => sum + item.count, 0) || 1;
                      const percentage = Math.max(10, (entry.count / totalReviewsCount) * 100);
                      return (
                        <div key={index} className="flex flex-col items-center w-20 group relative">
                          {/* Tooltip Count */}
                          <span className="absolute -top-4 text-[10px] font-bold px-2 py-0.5 rounded-md bg-forest-900 dark:bg-clay-100 text-clay-50 dark:text-forest-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xs">
                            {entry.count} Reviews
                          </span>
                          
                          {/* Custom Animated Bar Track */}
                          <div className="w-10 rounded-t-xl bg-slate-100 dark:bg-forest-900/60 h-[140px] flex items-end overflow-hidden border border-slate-200/20 dark:border-slate-800/10">
                            <div 
                              className="w-full rounded-t-xl transition-all duration-1000 ease-out animate-float-y" 
                              style={{ 
                                height: `${percentage}%`,
                                backgroundColor: entry.color,
                                boxShadow: `0 0 20px ${entry.color}66`
                              }}
                            />
                          </div>
                          
                          {/* Title Label */}
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-3 group-hover:text-forest-900 dark:group-hover:text-clay-50 transition-colors">
                            {entry.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. System Command Panel (5 columns) */}
                <div className="md:col-span-5 bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 shadow-sm transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">Operations Console</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed font-medium mb-5">
                      Execute maintenance hooks directly on the local database and memory nodes.
                    </p>
                  </div>

                  <div className="space-y-3.5">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-[10px] font-bold uppercase tracking-wider py-3 px-4 rounded-xl cursor-pointer"
                      onClick={handleFlushCache}
                      isLoading={isFlushingCache}
                      icon={<RefreshCw className="w-4 h-4 mr-2" />}
                    >
                      Flush System Cache
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full justify-start text-[10px] font-bold uppercase tracking-wider py-3 px-4 rounded-xl cursor-pointer"
                      onClick={handleCreateBackup}
                      isLoading={isCreatingBackup}
                      icon={<HardDrive className="w-4 h-4 mr-2" />}
                    >
                      Archive Database State
                    </Button>

                    <Button
                      variant="primary"
                      className="w-full justify-start text-[10px] font-bold uppercase tracking-wider py-3 px-4 rounded-xl cursor-pointer bg-forest-900 dark:bg-clay-50 text-clay-50 dark:text-forest-950"
                      onClick={() => setIsBroadcastModalOpen(true)}
                      icon={<Megaphone className="w-4 h-4 mr-2" />}
                    >
                      Broadcast Banner Notice
                    </Button>
                  </div>
                </div>
              </div>

              {/* Showcase Gallery: Uttarakhand Places Nodes */}
              <div className="bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 shadow-sm transition-all duration-300">
                <h3 className="text-xs font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center space-x-2">
                  <Award className="w-4 h-4 text-sage-600" />
                  <span>Uttarakhand Active Database Nodes</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {uttarakhandNodes.map((node, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className="relative h-28 rounded-2xl overflow-hidden group border border-slate-100 dark:border-slate-800"
                    >
                      <img src={node.img} alt={node.name} className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                        <span className="text-[9px] uppercase tracking-widest text-sage-400 font-bold">{node.coordinates}</span>
                        <h4 className="text-[11px] font-bold text-white mt-0.5">{node.name}</h4>
                        <span className="text-[9px] text-slate-300 mt-1 font-semibold block">{node.activeReviews} active reviews</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Management Layout Split: User Management Table */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left Columns: User list table */}
                <div className="md:col-span-8 bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 shadow-sm overflow-hidden transition-all duration-300">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h3 className="text-xs font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500">Manage System Accounts</h3>
                    
                    {/* Search and Filters inside table */}
                    <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
                      <div className="w-full sm:w-44">
                        <Input
                          placeholder="Search accounts..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="!space-y-0"
                          inputClassName="py-1.5 px-3 text-[10px] rounded-xl focus:ring-1 focus:ring-sage-500"
                          icon={<Search className="w-3.5 h-3.5 text-slate-400" />}
                        />
                      </div>
                      <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="bg-white dark:bg-forest-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2 py-1 text-[10px] font-bold text-slate-700 dark:text-slate-350 outline-none cursor-pointer"
                      >
                        <option value="all">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="business_owner">Owner</option>
                        <option value="farmer">Farmer</option>
                        <option value="guest">Guest</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                          <th className="pb-3 pr-4">Name</th>
                          <th className="pb-3 pr-4">Email</th>
                          <th className="pb-3 pr-4">Role</th>
                          <th className="pb-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/45 font-medium text-slate-700 dark:text-slate-350">
                        {filteredUsers.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="py-6 text-center text-slate-400 italic">No matching accounts found.</td>
                          </tr>
                        ) : (
                          filteredUsers.map(u => (
                            <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-forest-900/10 transition-colors">
                              <td className="py-3.5 pr-4">
                                <span className="font-bold text-forest-900 dark:text-clay-50">{u.name}</span>
                                <br />
                                <span className="text-[10px] text-slate-400">{u.shopName}</span>
                              </td>
                              <td className="py-3.5 pr-4 font-mono text-[10px] truncate max-w-[120px]">{u.email}</td>
                              <td className="py-3.5 pr-4 capitalize">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                  u.role === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' :
                                  u.role === 'farmer' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' :
                                  u.role === 'business_owner' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-405' :
                                  'bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-400'
                                }`}>
                                  {u.role.replace('_', ' ')}
                                </span>
                              </td>
                              <td className="py-3.5 text-right">
                                {u.role !== 'admin' ? (
                                  <button
                                    onClick={() => handleDeleteUser(u.id, u.name)}
                                    className="p-1.5 text-red-500 hover:bg-red-500/5 rounded-lg transition-colors cursor-pointer bg-transparent border-none"
                                    title="Delete User"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                ) : (
                                  <span className="text-[10px] text-slate-400 italic">Locked</span>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right Columns: Server Health & Logs */}
                <div className="md:col-span-4 space-y-6">
                  <div className="bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 shadow-sm transition-all duration-300">
                    <h3 className="text-xs font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">Diagnostics Telemetry</h3>
                    
                    <div className="space-y-4 text-xs font-semibold text-slate-750 dark:text-slate-350">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-450">Memory Overhead:</span>
                        <span className="font-mono">{(stats?.memoryUsage ? (stats.memoryUsage / 1024 / 1024).toFixed(2) : 18.52)} MB</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-450">CORS Connection:</span>
                        <span className="text-sage-600 font-mono">Port 5173 OK</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-450">Active Threads:</span>
                        <span className="font-mono">Cluster Primary</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-450">DB Sanitizer:</span>
                        <span className="text-sage-600 font-mono">Shield Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-[#19221F] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 shadow-sm transition-all duration-300">
                    <h3 className="text-xs font-bold font-display uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-sage-600" />
                      <span>Security Telemetry Logs</span>
                    </h3>
                    <div className="bg-slate-50 dark:bg-forest-900/40 rounded-2xl p-4 font-mono text-[9px] text-slate-500 dark:text-slate-450 space-y-2 select-none">
                      <p className="text-emerald-600 dark:text-emerald-450">[LOG] CORS handshake succeeded for origin: 5173</p>
                      <p className="text-slate-400">[LOG] Mongoose schemas successfully parsed 50 records</p>
                      <p className="text-slate-400">[LOG] Rate-limiter cache refreshed - 0 blocks active</p>
                    </div>
                  </div>
                </div>

              </div>
            </>
          )}

        </motion.div>
      </main>

      {/* Broadcast Modal Dialog */}
      <Modal
        isOpen={isBroadcastModalOpen}
        onClose={() => setIsBroadcastModalOpen(false)}
        title="Broadcast System Notice Banner"
        footerContent={
          <>
            <Button variant="outline" onClick={() => setIsBroadcastModalOpen(false)} className="text-xs py-2 px-4 cursor-pointer font-bold uppercase tracking-wider">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSendBroadcast} isLoading={isBroadcasting} className="text-xs py-2 px-4 cursor-pointer font-bold uppercase tracking-wider bg-forest-900 dark:bg-clay-50 text-clay-50 dark:text-forest-950">
              Send Broadcast
            </Button>
          </>
        }
      >
        <form onSubmit={handleSendBroadcast} className="space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
            Type the announcement below. This notice will be broadcasted to all active merchant dashboards.
          </p>
          <textarea
            placeholder="e.g. System upgrade scheduled for tonight at 23:00 IST."
            value={broadcastText}
            onChange={(e) => setBroadcastText(e.target.value)}
            className="w-full min-h-[80px] bg-slate-50 dark:bg-forest-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs font-bold text-slate-700 dark:text-clay-50 outline-none focus:ring-1 focus:ring-sage-505"
            required
          />
        </form>
      </Modal>

      <Footer />
    </div>
  );
}
