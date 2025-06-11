import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogOut, PlusSquare, ExternalLink, Trash2, Edit3, XSquare, CheckSquare, Link, Shield, Settings, Briefcase, User, Gamepad2, MessageSquare, Code2, DollarSign, Grid, List, AlertTriangle, Terminal, Activity, Wifi, Server, Database, Cat } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';


const GlitchText = ({ children, className, intensity = 'medium' }) => {
  const baseClass = "relative inline-block";
  const intensities = {
    low: { blur1: 'blur-[0.5px]', blur2: 'blur-[0.5px]', duration1: '0.08s', duration2: '0.1s' },
    medium: { blur1: 'blur-[1px]', blur2: 'blur-[1px]', duration1: '0.05s', duration2: '0.07s' },
    high: { blur1: 'blur-[1.5px]', blur2: 'blur-[1.5px]', duration1: '0.03s', duration2: '0.05s' },
  };
  const selectedIntensity = intensities[intensity] || intensities.medium;

  return (
    <span className={`${baseClass} ${className}`}>
      <span className={`absolute inset-0 opacity-70 text-secondary ${selectedIntensity.blur1} animate-pulse`} style={{ animationDuration: selectedIntensity.duration1, animationDirection: 'alternate-reverse', animationTimingFunction: 'steps(2, jump-end)' }} aria-hidden="true">{children}</span>
      <span className={`absolute inset-0 opacity-70 text-primary ${selectedIntensity.blur2} animate-pulse`} style={{ animationDuration: selectedIntensity.duration2, animationDirection: 'alternate', animationTimingFunction: 'steps(3, jump-start)' }} aria-hidden="true">{children}</span>
      {children}
    </span>
  );
};

const SystemStatusDisplay = () => {
  const statuses = [
    { text: "NETWORK_INTEGRITY::OPTIMAL", icon: <Wifi className="w-4 h-4 text-green-400" /> },
    { text: "CORE_PROCESSOR_LOAD::NOMINAL", icon: <Server className="w-4 h-4 text-blue-400" /> },
    { text: "DATA_STREAMS::STABLE", icon: <Database className="w-4 h-4 text-purple-400" /> },
    { text: "THREAT_LEVEL::MINIMAL", icon: <Shield className="w-4 h-4 text-teal-400" /> },
    { text: "OPERATOR_STATUS::ACTIVE", icon: <Activity className="w-4 h-4 text-yellow-400" /> },
  ];
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentStatusIndex((prevIndex) => (prevIndex + 1) % statuses.length);
    }, 3500);
    return () => clearInterval(intervalId);
  }, [statuses.length]);

  return (
    <div className="flex items-center justify-center p-2 rounded-md bg-card/50 border border-primary/30 w-full md:flex-grow min-h-[44px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStatusIndex}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground tracking-wider"
        >
          {statuses[currentStatusIndex].icon}
          <span>{statuses[currentStatusIndex].text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};


const DancingCatOverlay = ({ onStop }) => {
  const catGifs = [
    "https://media.tenor.com/uB_Q_4M4tXAAAAAi/cat-dance.gif",
    "https://media.tenor.com/J3qfV0j3QkAAAAAi/cat-vibe.gif",
    "https://media.tenor.com/hP2hW2h3RjAAAAAi/cat-jam.gif",
    "https://media.tenor.com/M90Y2U203rgAAAAi/cat-vibing.gif",
    "https://media.tenor.com/NCfM0p6n7wQAAAAi/cat-dance-cat-dancing.gif"
  ];
  const [currentCat, setCurrentCat] = useState(catGifs[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCat(catGifs[Math.floor(Math.random() * catGifs.length)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, scale: 1, backdropFilter: "blur(10px)" }}
      exit={{ opacity: 0, scale: 0.5, backdropFilter: "blur(0px)" }}
      transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 p-4"
      onClick={onStop}
    >
      <motion.img 
        src={currentCat} 
        alt="Dancing Cat" 
        className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg shadow-2xl shadow-primary/50"
        animate={{
            y: ["0%", "-10%", "0%", "10%", "0%"],
            rotate: [0, 5, -5, 5, 0],
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.p 
        className="mt-6 text-2xl sm:text-3xl font-black text-neon-primary-strong uppercase tracking-wider gta-rp-text-stroke"
        initial={{opacity:0, y:20}}
        animate={{opacity:1, y:0}}
        transition={{delay:0.3}}
      >
        <GlitchText intensity="high">SYSTEM_OVERLOAD::CAT_JAM_INITIATED</GlitchText>
      </motion.p>
      <Button onClick={onStop} className="cyberpunk-rp-button destructive mt-8 px-6 py-3 text-base">
        <XSquare className="w-5 h-5 mr-2" />
        CEASE_FELINE_FRENZY
      </Button>
    </motion.div>
  );
};


export function NewAdminPanel({ onLogout }) {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ name: '', url: '', description: '', category: 'General', iconName: 'Link' });
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', url: '', description: '', category: '', iconName: '' });
  const [searchTerm, setSearchTerm] = useState(''); 
  const [viewMode, setViewMode] = useState('grid'); 
  const [showDancingCat, setShowDancingCat] = useState(false);


        {/* 🚪 Logout Button */}
      <button
        onClick={onLogout}
        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
      >
        Logout
      </button>
  const categories = ['General', 'Work', 'Personal', 'Development', 'Tools', 'Entertainment', 'Social', 'Finance', 'System', 'Matrix', 'Archives', 'Comms'];
  const iconMap = {
    Link: <Link />, Shield: <Shield />, Settings: <Settings />, Briefcase: <Briefcase />, User: <User />,
    Gamepad2: <Gamepad2 />, MessageSquare: <MessageSquare />, Code2: <Code2 />, DollarSign: <DollarSign />,
    Grid: <Grid />, List: <List />, Wifi: <Wifi/>, Server: <Server/>, Database: <Database/>, Activity: <Activity/>, Cat: <Cat/>, Default: <Link />
  };

  const getIcon = (iconName, props = {}) => {
    const IconComponent = iconMap[iconName] || iconMap.Default;
    return React.cloneElement(IconComponent, { className: "w-6 h-6", ...props });
  };

  useEffect(() => {
    const savedLinks = localStorage.getItem('mlvsDistrictLinks_v2'); 
    if (savedLinks) {
      setLinks(JSON.parse(savedLinks));
    } else {
      const defaultLinks = [
        { id: 'sys-wiki', name: 'District Wiki', url: '#', description: 'Central knowledge base for MLVS District operations.', category: 'System', iconName: 'Shield' },
        { id: 'sys-comms', name: 'Secure Comms', url: '#', description: 'Encrypted communication channels.', category: 'Comms', iconName: 'MessageSquare' },
        { id: 'dev-nexus', name: 'Dev Nexus', url: '#', description: 'Development tools and repositories.', category: 'Development', iconName: 'Code2' },
        { id: 'matrix-main', name: 'Matrix Access', url: '#', description: 'Primary interface to the global Matrix.', category: 'Matrix', iconName: 'Grid' },
        { id: 'archive-logs', name: 'Data Archives', url: '#', description: 'Historical logs and classified information.', category: 'Archives', iconName: 'Database' },
        { id: 'corp-intel', name: 'Corporate Intel', url: '#', description: 'Intelligence on major corporations.', category: 'Work', iconName: 'Briefcase' },
        { id: 'black-market', name: 'Night Market Hub', url: '#', description: 'Access to underground markets.', category: 'Tools', iconName: 'DollarSign' },
        { id: 'social-grid', name: 'Social Grid', url: '#', description: 'Public and private social networks.', category: 'Social', iconName: 'User' },
        { id: 'game-sims', name: 'Simulation Deck', url: '#', description: 'Recreational combat and strategy simulations.', category: 'Entertainment', iconName: 'Gamepad2' },
      ];
      setLinks(defaultLinks.map(link => ({...link, icon: getIcon(link.iconName)})));
      localStorage.setItem('mlvsDistrictLinks_v2', JSON.stringify(defaultLinks));
    }
  }, []);

  const saveLinks = (updatedLinks) => {
    setLinks(updatedLinks.map(link => ({...link, icon: getIcon(link.iconName)})));
    localStorage.setItem('mlvsDistrictLinks_v2', JSON.stringify(updatedLinks.map(({icon, ...rest}) => rest)));
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    if (!newLink.name || !newLink.url) {
      toast({ title: "INPUT_ERROR", description: "Link Name and URL are mandatory.", variant: "destructive" });
      return;
    }
    const linkToAdd = { id: `link-${Date.now()}`, ...newLink };
    saveLinks([...links, linkToAdd]);
    setNewLink({ name: '', url: '', description: '', category: 'General', iconName: 'Link' });
    setIsAdding(false);
    toast({ title: "NODE_ESTABLISHED", description: `Link '${newLink.name}' integrated into the network.` });
  };

  const handleDeleteLink = (id, name) => {
    saveLinks(links.filter(link => link.id !== id));
    toast({ title: "NODE_SEVERED", description: `Link '${name}' decommissioned.`, variant: "destructive" });
  };
  
  const handleEdit = (link) => {
    setEditingId(link.id);
    setEditFormData({ name: link.name, url: link.url, description: link.description, category: link.category, iconName: link.iconName });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editFormData.name || !editFormData.url) {
       toast({ title: "UPDATE_ERROR", description: "Link Name and URL cannot be empty.", variant: "destructive" });
      return;
    }
    saveLinks(links.map(link => link.id === editingId ? { ...link, ...editFormData } : link));
    setEditingId(null);
    toast({ title: "NODE_RECALIBRATED", description: `Link '${editFormData.name}' parameters updated.` });
  };

  const handleVisitLink = (url, name) => {
    if (url === '#') {
      toast({ title: "SYSTEM_LINK", description: `Accessing internal module: '${name}'. Further action required.`, variant: "default" });
      return;
    }
    window.open(url, '_blank');
    toast({ title: "CONNECTION_INITIATED", description: `Routing to external node: '${name}'...` });
  };

  const filteredLinks = links.filter(link => 
    link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (link.description && link.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    link.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 12 } }
  };
  
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/df88ad0e-10b3-4647-8edb-bb90fb8b340a/25a074fa8e4856c6e21231a9788f7e73.png";

  return (
    <div className="admin-panel-container cyberpunk-rp-bg">
      <AnimatePresence>
        {showDancingCat && <DancingCatOverlay onStop={() => setShowDancingCat(false)} />}
      </AnimatePresence>
      <div className="animated-circuit-bg enhanced-circuits"></div>
      <img-replace src="/placeholder.jpg" alt="Digital command center interface with glowing data streams and holographic displays" className="absolute inset-0 w-full h-full object-cover opacity-[0.12] -z-10 pointer-events-none" />

      <motion.header
        initial={{ opacity: 0, y: -80, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95], delay: 0.2 }}
        className="sticky top-0 z-20 bg-card/85 backdrop-blur-xl border-b-2 border-primary/60 px-4 sm:px-6 lg:px-8 py-4 shadow-2xl shadow-primary/20"
      >
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-3 sm:gap-4">
            <img src={logoUrl} alt="MLVS District Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain admin-logo-pulse" />
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-neon-primary-strong uppercase tracking-wider gta-rp-text-stroke">
                MLVS <GlitchText className="text-primary title-rp-accent" intensity="low">CONSOLE</GlitchText>
              </h1>
              <p className="text-muted-foreground/80 tracking-widest text-xs sm:text-sm">// OPERATOR_COMMAND_INTERFACE</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Button
              onClick={() => setShowDancingCat(true)}
              variant="outline"
              className="cyberpunk-rp-button destructive px-3 py-2.5 text-xs sm:text-sm !bg-yellow-500 hover:!bg-yellow-400 !border-yellow-600 !text-black dont-click-button"
            >
              <Cat className="w-4 h-4 mr-1.5 animate-bounce" />
              DON'T CLICK
            </Button>
            <Button
              onClick={onLogout}
              variant="outline"
              className="cyberpunk-rp-button destructive px-5 py-2.5 text-sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              DISCONNECT_LINK
            </Button>
          </div>
        </div>
      </motion.header>
      
      <main className="admin-panel-content relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8 p-5 sm:p-6 cyberpunk-rp-card"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <SystemStatusDisplay />
            <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
              <Button
                onClick={() => setIsAdding(!isAdding)}
                className="cyberpunk-rp-button flex-grow md:flex-grow-0 px-4 py-2.5 text-sm"
              >
                {isAdding ? <XSquare className="w-4 h-4 mr-2" /> : <PlusSquare className="w-4 h-4 mr-2" />}
                {isAdding ? 'ABORT_NODE_SETUP' : 'NEW_NODE_SETUP'}
              </Button>
              <Button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                variant="outline"
                className="cyberpunk-rp-button secondary px-3 py-2.5 text-sm"
                aria-label={viewMode === 'grid' ? "Switch to List View" : "Switch to Grid View"}
              >
                {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {isAdding && (
              <motion.form 
                initial={{ opacity: 0, height: 0, marginTop: 0, filter: "blur(5px)" }}
                animate={{ opacity: 1, height: 'auto', marginTop: '1.5rem', filter: "blur(0px)" }}
                exit={{ opacity: 0, height: 0, marginTop: 0, filter: "blur(5px)" }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                onSubmit={handleAddLink} className="space-y-5 pt-6 border-t border-primary/40"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="newLinkName" className="text-secondary uppercase tracking-wider text-xs font-semibold">Node_Identifier</Label>
                    <Input id="newLinkName" value={newLink.name} onChange={(e) => setNewLink({ ...newLink, name: e.target.value })} className="cyberpunk-rp-input mt-1" placeholder="e.g., Project Chimera" required />
                  </div>
                  <div>
                    <Label htmlFor="newLinkUrl" className="text-secondary uppercase tracking-wider text-xs font-semibold">Node_Address (URL)</Label>
                    <Input id="newLinkUrl" type="text" value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} className="cyberpunk-rp-input mt-1" placeholder="https://target.domain or #" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="newLinkDescription" className="text-secondary uppercase tracking-wider text-xs font-semibold">Node_Briefing (Optional)</Label>
                  <Input id="newLinkDescription" value={newLink.description} onChange={(e) => setNewLink({ ...newLink, description: e.target.value })} className="cyberpunk-rp-input mt-1" placeholder="Purpose or access notes" />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="newLinkCategory" className="text-secondary uppercase tracking-wider text-xs font-semibold">Network_Segment</Label>
                    <select id="newLinkCategory" value={newLink.category} onChange={(e) => setNewLink({ ...newLink, category: e.target.value, iconName: e.target.selectedOptions[0].dataset.icon || 'Link' })} className="cyberpunk-rp-input mt-1 w-full">
                      {categories.map(cat => <option key={cat} value={cat} data-icon={Object.keys(iconMap).find(key => key.toLowerCase() === cat.toLowerCase()) || 'Link'}>{cat}</option>)}
                    </select>
                  </div>
                   <div>
                    <Label htmlFor="newLinkIcon" className="text-secondary uppercase tracking-wider text-xs font-semibold">Node_Glyph</Label>
                    <select id="newLinkIcon" value={newLink.iconName} onChange={(e) => setNewLink({ ...newLink, iconName: e.target.value })} className="cyberpunk-rp-input mt-1 w-full">
                      {Object.keys(iconMap).filter(key => key !== 'Default').map(iconKey => <option key={iconKey} value={iconKey}>{iconKey}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 pt-2">
                  <Button type="submit" className="cyberpunk-rp-button px-5 py-2.5 text-sm"><CheckSquare className="w-4 h-4 mr-2"/>CONFIRM_INTEGRATION</Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {editingId && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-30 p-4"
              onClick={() => setEditingId(null)}
            >
              <motion.div 
                initial={{scale: 0.7, opacity: 0, y: 50}}
                animate={{scale: 1, opacity: 1, y: 0}}
                exit={{scale: 0.7, opacity: 0, y: 50}}
                transition={{type: "spring", stiffness:150, damping:15}}
              >
                <Card className="cyberpunk-rp-card w-full max-w-lg border-2 border-secondary/70 shadow-xl shadow-secondary/30" onClick={(e) => e.stopPropagation()}>
                  <CardHeader className="border-b border-secondary/40">
                    <CardTitle className="text-2xl text-neon-secondary-strong flex items-center gap-2 uppercase tracking-wider"><Edit3 className="w-6 h-6"/>Recalibrate Node</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleSaveEdit} className="space-y-4">
                      <div>
                        <Label htmlFor="editLinkName" className="text-secondary uppercase tracking-wider text-xs font-semibold">Node_Identifier</Label>
                        <Input id="editLinkName" value={editFormData.name} onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })} className="cyberpunk-rp-input mt-1" required />
                      </div>
                      <div>
                        <Label htmlFor="editLinkUrl" className="text-secondary uppercase tracking-wider text-xs font-semibold">Node_Address (URL)</Label>
                        <Input id="editLinkUrl" type="text" value={editFormData.url} onChange={(e) => setEditFormData({ ...editFormData, url: e.target.value })} className="cyberpunk-rp-input mt-1" required />
                      </div>
                      <div>
                        <Label htmlFor="editLinkDescription" className="text-secondary uppercase tracking-wider text-xs font-semibold">Node_Briefing</Label>
                        <Input id="editLinkDescription" value={editFormData.description} onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })} className="cyberpunk-rp-input mt-1" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="editLinkCategory" className="text-secondary uppercase tracking-wider text-xs font-semibold">Network_Segment</Label>
                          <select id="editLinkCategory" value={editFormData.category} onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value, iconName: e.target.selectedOptions[0].dataset.icon || 'Link' })} className="cyberpunk-rp-input mt-1 w-full">
                            {categories.map(cat => <option key={cat} value={cat} data-icon={Object.keys(iconMap).find(key => key.toLowerCase() === cat.toLowerCase()) || 'Link'}>{cat}</option>)}
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="editLinkIcon" className="text-secondary uppercase tracking-wider text-xs font-semibold">Node_Glyph</Label>
                          <select id="editLinkIcon" value={editFormData.iconName} onChange={(e) => setEditFormData({ ...editFormData, iconName: e.target.value })} className="cyberpunk-rp-input mt-1 w-full">
                            {Object.keys(iconMap).filter(key => key !== 'Default').map(iconKey => <option key={iconKey} value={iconKey}>{iconKey}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-4 pt-3">
                        <Button type="submit" className="cyberpunk-rp-button secondary px-5 py-2.5 text-sm"><CheckSquare className="w-4 h-4 mr-2"/>APPLY_MODIFICATIONS</Button>
                        <Button type="button" variant="outline" onClick={() => setEditingId(null)} className="cyberpunk-rp-button destructive px-5 py-2.5 text-sm"><XSquare className="w-4 h-4 mr-2"/>DISCARD_CHANGES</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`grid gap-5 sm:gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}
        >
          <AnimatePresence>
            {filteredLinks.map((link, index) => (
              <motion.div
                key={link.id}
                layout
                variants={itemVariants}
                custom={index}
                className="group admin-link-card"
              >
                <Card className={`cyberpunk-rp-card card-hover-rp h-full flex flex-col justify-between overflow-hidden border-primary/40 hover:border-secondary/80 ${viewMode === 'list' ? 'flex-row items-center p-4' : ''}`}>
                  <CardHeader className={`pb-3 pt-5 px-5 ${viewMode === 'list' ? 'flex-grow p-0 pr-4' : ''}`}>
                    <div className={`flex items-start justify-between mb-2 ${viewMode === 'list' ? 'flex-col sm:flex-row sm:items-center w-full' : ''}`}>
                      <div className={`flex items-center gap-3 min-w-0 ${viewMode === 'list' ? 'mb-2 sm:mb-0' : ''}`}>
                        <motion.div 
                          className="p-2.5 bg-card/80 border border-primary/50 rounded-lg shadow-md group-hover:border-secondary group-hover:shadow-secondary/30 transition-all duration-300"
                          whileHover={{scale:1.1, rotate: -5}}
                        >
                          {getIcon(link.iconName, {className: "w-6 h-6 text-primary group-hover:text-secondary transition-colors duration-300"})}
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base sm:text-lg text-neon-primary-strong uppercase tracking-wide truncate group-hover:text-neon-secondary-strong transition-colors duration-300" title={link.name}>{link.name}</CardTitle>
                          <p className="text-xs text-secondary tracking-wider">{link.category}</p>
                        </div>
                      </div>
                      <div className={`flex gap-1.5 shrink-0 ${viewMode === 'list' ? 'sm:ml-auto' : 'flex-col sm:flex-row'}`}>
                        <Button onClick={() => handleEdit(link)} variant="ghost" size="icon" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 w-8 h-8 opacity-60 group-hover:opacity-100 transition-opacity" aria-label="Modify Node"><Edit3 className="w-4 h-4" /></Button>
                        <Button onClick={() => handleDeleteLink(link.id, link.name)} variant="ghost" size="icon" className="text-destructive hover:text-red-400 hover:bg-destructive/20 w-8 h-8 opacity-60 group-hover:opacity-100 transition-opacity" aria-label="Decommission Node"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                    {viewMode === 'grid' && (
                      <CardDescription className="text-muted-foreground/70 text-sm leading-relaxed pt-1 h-12 overflow-y-auto custom-scrollbar">
                          {link.description || '// NO_ADDITIONAL_DATA_UPLOADED'}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className={`pt-2 pb-5 px-5 ${viewMode === 'list' ? 'p-0 pl-4 sm:pl-0 sm:pt-2 sm:pb-0 sm:px-0 shrink-0 w-full sm:w-auto' : ''}`}>
                    <div className="space-y-3">
                      {viewMode === 'grid' && <p className="text-xs text-muted-foreground/60 break-all tracking-wider truncate" title={link.url}>ADDR: {link.url}</p>}
                      <Button onClick={() => handleVisitLink(link.url, link.name)} className={`w-full cyberpunk-rp-button secondary py-2.5 text-sm ${viewMode === 'list' ? 'px-3' : ''}`}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        <GlitchText intensity="low">CONNECT</GlitchText>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredLinks.length === 0 && !isAdding && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{delay:0.2, type:"spring", stiffness:100, damping:15}}
            className="text-center py-16"
          >
            <Card className="cyberpunk-rp-card max-w-md mx-auto p-8 border-2 border-destructive/50 shadow-lg shadow-destructive/20">
              <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-6 animate-pulse" style={{animationDuration: '1.2s'}}/>
              <h3 className="text-2xl font-bold text-neon-primary-strong uppercase mb-3">Network Void Detected</h3>
              <p className="text-muted-foreground/80 mb-6 tracking-wide">
                No active nodes match query parameters or the network segment is unpopulated. Establish new connections to expand operational matrix.
              </p>
              <Button onClick={() => setIsAdding(true)} className="cyberpunk-rp-button px-5 py-2.5 text-sm">
                <PlusSquare className="w-4 h-4 mr-2" />
                ESTABLISH_FIRST_NODE
              </Button>
            </Card>
          </motion.div>
        )}
      </main>
      <motion.footer 
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1, duration:1}}
        className="text-center py-4 px-4 border-t border-primary/30 text-xs text-muted-foreground/60 tracking-widest uppercase"
      >
        MLVS District Console v3.1.2 // System Time: {new Date().toLocaleTimeString()} // Security Level: MAX // Operator: Authenticated
      </motion.footer>
    </div>
  );
}
