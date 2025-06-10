
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, PlusSquare, ExternalLink, Trash2, Globe, BookOpen, Settings, Server, AlertTriangle, Edit3, XSquare, CheckSquare, Search } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export function AdminPanel({ onLogout }) {
  const [websites, setWebsites] = useState([]);
  const [newWebsite, setNewWebsite] = useState({ name: '', url: '', description: '', category: 'General' });
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', url: '', description: '', category: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['General', 'Work', 'Personal', 'Tools', 'Entertainment', 'Social', 'Development', 'Finance'];

  const defaultIcons = {
    General: <Globe className="w-6 h-6 text-primary" />,
    Work: <Server className="w-6 h-6 text-green-400" />,
    Personal: <BookOpen className="w-6 h-6 text-blue-400" />,
    Tools: <Settings className="w-6 h-6 text-yellow-400" />,
    Entertainment: <ExternalLink className="w-6 h-6 text-purple-400" />,
    Social: <Users className="w-6 h-6 text-pink-400" />,
    Development: <Code className="w-6 h-6 text-orange-400" />,
    Finance: <DollarSign className="w-6 h-6 text-teal-400" />,
    Default: <Globe className="w-6 h-6 text-primary" />
  };
  
  // Placeholder for Users, Code, DollarSign if not imported
  const Users = (props) => <Globe {...props} />; 
  const Code = (props) => <Settings {...props} />;
  const DollarSign = (props) => <Server {...props} />;


  const getIconForCategory = (category) => {
    return defaultIcons[category] || defaultIcons.Default;
  };

  useEffect(() => {
    const savedWebsites = localStorage.getItem('adminWebsites_v2');
    if (savedWebsites) {
      const parsedWebsites = JSON.parse(savedWebsites).map(site => ({...site, icon: getIconForCategory(site.category)}));
      setWebsites(parsedWebsites);
    } else {
       const defaultWebsites = [
        { id: 1, name: 'NetWatch Archives', url: 'https://example.com/netwatch', description: 'Classified NetWatch intelligence database.', category: 'Work', icon: getIconForCategory('Work') },
        { id: 2, name: 'Personal Datavault', url: 'https://example.com/mydata', description: 'Encrypted personal logs and schematics.', category: 'Personal', icon: getIconForCategory('Personal') },
        { id: 3, name: 'Ripperdoc Tools', url: 'https://example.com/ripper', description: 'Cyberware diagnostics and modding utilities.', category: 'Tools', icon: getIconForCategory('Tools') },
      ];
      setWebsites(defaultWebsites);
      localStorage.setItem('adminWebsites_v2', JSON.stringify(defaultWebsites.map(({icon, ...rest}) => rest)));
    }
  }, []);

  const saveWebsites = (updatedWebsites) => {
    const sitesWithIcons = updatedWebsites.map(site => ({...site, icon: getIconForCategory(site.category)}));
    setWebsites(sitesWithIcons);
    localStorage.setItem('adminWebsites_v2', JSON.stringify(updatedWebsites.map(({icon, ...rest}) => rest)));
  };

  const handleAddWebsite = (e) => {
    e.preventDefault();
    if (!newWebsite.name || !newWebsite.url) {
      toast({ title: "INPUT_ERROR", description: "Name and URL are required.", variant: "destructive" });
      return;
    }
    const website = { id: Date.now(), ...newWebsite, icon: getIconForCategory(newWebsite.category) };
    const updatedWebsites = [...websites, website];
    saveWebsites(updatedWebsites);
    setNewWebsite({ name: '', url: '', description: '', category: 'General' });
    setIsAdding(false);
    toast({ title: "NODE_INTEGRATED", description: `Endpoint '${newWebsite.name}' added.` });
  };

  const handleDeleteWebsite = (id, name) => {
    const updatedWebsites = websites.filter(site => site.id !== id);
    saveWebsites(updatedWebsites);
    toast({ title: "NODE_DECOMMISSIONED", description: `Endpoint '${name}' removed.`, variant: "destructive" });
  };
  
  const handleEdit = (website) => {
    setEditingId(website.id);
    setEditFormData({ name: website.name, url: website.url, description: website.description, category: website.category });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editFormData.name || !editFormData.url) {
       toast({ title: "UPDATE_ERROR", description: "Name and URL cannot be empty.", variant: "destructive" });
      return;
    }
    const updatedWebsites = websites.map(site => 
      site.id === editingId ? { ...site, ...editFormData, icon: getIconForCategory(editFormData.category) } : site
    );
    saveWebsites(updatedWebsites);
    setEditingId(null);
    toast({ title: "NODE_UPDATED", description: `Endpoint '${editFormData.name}' modified.` });
  };

  const handleVisitWebsite = (url, name) => {
    window.open(url, '_blank');
    toast({ title: "ROUTING_REQUESTED", description: `Connecting to '${name}'...` });
  };

  const filteredWebsites = websites.filter(site => 
    site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    site.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    site.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="admin-panel-container cyberpunk-rp-bg">
      <div className="animated-circuit-bg"></div>
      <img-replace src="/placeholder.jpg" alt="Abstract network grid with glowing nodes and connections" className="absolute inset-0 w-full h-full object-cover opacity-10 -z-10 pointer-events-none" />

      <motion.header
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.6, 0.01, -0.05, 0.95] }}
        className="sticky top-0 z-20 bg-card/80 backdrop-blur-lg border-b-2 border-primary/50 px-4 sm:px-6 lg:px-8 py-4 shadow-lg shadow-primary/10"
      >
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-neon-primary-strong uppercase tracking-wider gta-rp-text-stroke">Admin Nexus</h1>
            <p className="text-muted-foreground/80 tracking-widest text-sm">// NETWORK_CONTROL_INTERFACE</p>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="cyberpunk-rp-button destructive mt-3 sm:mt-0 px-5 py-2.5 text-sm"
          >
            <LogOut className="w-4 h-4 mr-2" />
            TERMINATE_LINK
          </Button>
        </div>
      </motion.header>
      
      <main className="admin-panel-content relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 p-6 cyberpunk-rp-card"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:flex-grow">
              <Input 
                type="text"
                placeholder="Search Endpoints (Name, Desc, Category)..."
                className="cyberpunk-rp-input pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
            <Button
              onClick={() => setIsAdding(!isAdding)}
              className="cyberpunk-rp-button w-full md:w-auto px-5 py-2.5 text-sm"
            >
              {isAdding ? <XSquare className="w-4 h-4 mr-2" /> : <PlusSquare className="w-4 h-4 mr-2" />}
              {isAdding ? 'CANCEL_INTEGRATION' : 'INTEGRATE_ENDPOINT'}
            </Button>
          </div>

          <AnimatePresence>
            {isAdding && (
              <motion.form 
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: '1.5rem' }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                onSubmit={handleAddWebsite} className="space-y-5 pt-6 border-t border-primary/30"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="newName" className="text-secondary uppercase tracking-wider text-xs font-semibold">Endpoint_Alias</Label>
                    <Input id="newName" value={newWebsite.name} onChange={(e) => setNewWebsite({ ...newWebsite, name: e.target.value })} className="cyberpunk-rp-input mt-1" placeholder="e.g., Project_Phoenix" required />
                  </div>
                  <div>
                    <Label htmlFor="newUrl" className="text-secondary uppercase tracking-wider text-xs font-semibold">Target_URL</Label>
                    <Input id="newUrl" type="url" value={newWebsite.url} onChange={(e) => setNewWebsite({ ...newWebsite, url: e.target.value })} className="cyberpunk-rp-input mt-1" placeholder="https://your.target.net" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="newDescription" className="text-secondary uppercase tracking-wider text-xs font-semibold">Briefing_Intel (Optional)</Label>
                  <Input id="newDescription" value={newWebsite.description} onChange={(e) => setNewWebsite({ ...newWebsite, description: e.target.value })} className="cyberpunk-rp-input mt-1" placeholder="Endpoint function or notes" />
                </div>
                <div>
                  <Label htmlFor="newCategory" className="text-secondary uppercase tracking-wider text-xs font-semibold">Category_Tag</Label>
                  <select id="newCategory" value={newWebsite.category} onChange={(e) => setNewWebsite({ ...newWebsite, category: e.target.value })} className="cyberpunk-rp-input mt-1 w-full">
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="flex gap-4 pt-2">
                  <Button type="submit" className="cyberpunk-rp-button px-5 py-2.5 text-sm"><CheckSquare className="w-4 h-4 mr-2"/>CONFIRM</Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {editingId && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-30 p-4"
              onClick={() => setEditingId(null)}
            >
              <Card className="cyberpunk-rp-card w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                <CardHeader className="border-b border-primary/30">
                  <CardTitle className="text-2xl text-neon-primary-strong flex items-center gap-2 uppercase tracking-wider"><Edit3 className="w-6 h-6"/>Modify Endpoint</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleSaveEdit} className="space-y-4">
                     <div>
                      <Label htmlFor="editName" className="text-secondary uppercase tracking-wider text-xs font-semibold">Endpoint_Alias</Label>
                      <Input id="editName" value={editFormData.name} onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })} className="cyberpunk-rp-input mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="editUrl" className="text-secondary uppercase tracking-wider text-xs font-semibold">Target_URL</Label>
                      <Input id="editUrl" type="url" value={editFormData.url} onChange={(e) => setEditFormData({ ...editFormData, url: e.target.value })} className="cyberpunk-rp-input mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="editDescription" className="text-secondary uppercase tracking-wider text-xs font-semibold">Briefing_Intel</Label>
                      <Input id="editDescription" value={editFormData.description} onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })} className="cyberpunk-rp-input mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="editCategory" className="text-secondary uppercase tracking-wider text-xs font-semibold">Category_Tag</Label>
                      <select id="editCategory" value={editFormData.category} onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })} className="cyberpunk-rp-input mt-1 w-full">
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div className="flex gap-4 pt-3">
                      <Button type="submit" className="cyberpunk-rp-button px-5 py-2.5 text-sm"><CheckSquare className="w-4 h-4 mr-2"/>SAVE_CHANGES</Button>
                      <Button type="button" variant="outline" onClick={() => setEditingId(null)} className="cyberpunk-rp-button secondary px-5 py-2.5 text-sm"><XSquare className="w-4 h-4 mr-2"/>CANCEL</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredWebsites.map((website) => (
              <motion.div
                key={website.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="group"
              >
                <Card className="cyberpunk-rp-card card-hover-rp h-full flex flex-col justify-between overflow-hidden">
                  <CardHeader className="pb-3 pt-5 px-5">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2.5 bg-card/70 border border-primary/40 rounded-md shadow-md">
                          {website.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg text-neon-primary-strong uppercase tracking-wide truncate" title={website.name}>{website.name}</CardTitle>
                          <p className="text-xs text-secondary tracking-wider">{website.category}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-1.5 shrink-0">
                        <Button onClick={() => handleEdit(website)} variant="ghost" size="icon" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity" aria-label="Modify Endpoint"><Edit3 className="w-4 h-4" /></Button>
                        <Button onClick={() => handleDeleteWebsite(website.id, website.name)} variant="ghost" size="icon" className="text-destructive hover:text-red-400 hover:bg-destructive/20 w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity" aria-label="Decommission Endpoint"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                    <CardDescription className="text-muted-foreground/70 text-sm leading-relaxed pt-1 h-12 overflow-y-auto">
                        {website.description || '// NO_ADDITIONAL_DATA'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2 pb-5 px-5">
                    <div className="space-y-3">
                      <p className="text-xs text-muted-foreground/60 break-all tracking-wider truncate" title={website.url}>URL: {website.url}</p>
                      <Button onClick={() => handleVisitWebsite(website.url, website.name)} className="w-full cyberpunk-rp-button secondary py-2.5 text-sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        ACCESS_NODE
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredWebsites.length === 0 && !isAdding && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Card className="cyberpunk-rp-card max-w-md mx-auto p-8">
              <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-6 animate-pulse" style={{animationDuration: '1.2s'}}/>
              <h3 className="text-2xl font-bold text-neon-primary-strong uppercase mb-3">Network Clear</h3>
              <p className="text-muted-foreground/80 mb-6 tracking-wide">
                No active endpoints match your query or the network is empty. Integrate new nodes to expand capabilities.
              </p>
              <Button onClick={() => setIsAdding(true)} className="cyberpunk-rp-button px-5 py-2.5 text-sm">
                <PlusSquare className="w-4 h-4 mr-2" />
                INTEGRATE_FIRST_NODE
              </Button>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
}
