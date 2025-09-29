import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  ClipboardList,
  Settings,
  BarChart3,
  Home
} from 'lucide-react';
import { cn } from '../../utils/cn';
import logo from '../../images/logo.png';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Jobs', href: '/dashboard/jobs', icon: Briefcase },
  { name: 'Candidates', href: '/dashboard/candidates', icon: Users },
  { name: 'Assessments', href: '/dashboard/assessments', icon: ClipboardList },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar({ isOpen, onClose, collapsed, onToggleCollapse }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        'fixed top-0 left-0 z-50 h-full bg-white border-r border-orange-200 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:h-full',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        collapsed ? 'w-16' : 'w-64'
      )}>
        {/* Logo */}
        <div className={cn(
          "flex items-center gap-3 py-4 border-b border-orange-200 transition-all duration-300",
          collapsed ? "px-3 justify-center" : "px-6"
        )}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
            <img 
              src={logo} 
              alt="TalentFlow Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-black">TalentFlow</h1>
              <p className="text-xs text-black">Hiring Platform</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className={cn(
          "flex-1 py-6 space-y-1 transition-all duration-300",
          collapsed ? "px-2" : "px-4"
        )}>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-orange-100 text-black border border-orange-200'
                    : 'text-black hover:bg-orange-50 hover:text-black',
                  collapsed ? 'justify-center' : ''
                )}
                title={collapsed ? item.name : ''}
              >
                <item.icon className="w-5 h-5" />
                {!collapsed && item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={cn(
          "border-t border-orange-200 transition-all duration-300",
          collapsed ? "p-2" : "p-4"
        )}>
          <div className={cn(
            "flex items-center gap-3 p-3 bg-orange-50 rounded-lg transition-all duration-300",
            collapsed ? "justify-center" : ""
          )}>
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-orange-700">HR</span>
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-medium text-black">HR Team</p>
                <p className="text-xs text-black">admin@talentflow.com</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
