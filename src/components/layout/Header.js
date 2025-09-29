import React, { useState } from 'react';
import { Menu, Bell, Search, Plus, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { cn } from '../../utils/cn';

export function Header({ onMenuClick, onToggleSidebar, sidebarCollapsed, showSearch = true }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="px-4 lg:px-6 py-4 border-b border-orange-200 bg-white">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden p-2"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="hidden lg:flex p-2"
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen className="w-5 h-5" />
            ) : (
              <PanelLeftClose className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Center - Search */}
        {showSearch && (
          <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
              <Input
                placeholder="Search jobs, candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="p-2">
            <Bell className="w-5 h-5" />
          </Button>
          
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add New
          </Button>
        </div>
      </div>
    </header>
  );
}
