import React, { useState } from "react";
import logo from '../assets/icon/logo.svg';
import accountIcon from '../assets/icon/account-icon.svg';
import settingsIcon from '../assets/icon/settings-icon.svg';
import searchIcon from '../assets/icon/search-icon.svg';
import hardHatIcon from '../assets/icon/hard-hat-icon.svg';
import closeIcon from '../assets/icon/close-icon.svg';
import logoutIcon from '../assets/icon/logout-icon.svg';
import briefcaseIcon from '../assets/icon/briefcase-icon.svg';
import backBriefcaseIcon from '../assets/icon/back-briefcase.svg';
import dashIcon from '../assets/icon/dash-icon.svg';

const Sidebar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu toggle */}
      <button 
        className="sidebar__mobile-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <img src={closeIcon} alt="Close" style={{ width: '24px', height: '24px' }} /> : <i/>}
      </button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="sidebar__mobile-overlay"
          onClick={toggleMobileMenu}
        />
      )}

      <div className={`sidebar ${isMobileMenuOpen ? 'sidebar--mobile-open' : ''}`}>
        {/* Left mini bar */}
        <div className="sidebar__mini-bar">
                                                                                                                                                                                                                                                                                                                                                               <div className="sidebar__mini-bar-top">
                 <img 
                   src={logo} 
                   alt="logo" 
                   className="sidebar__logo" 
                   style={{ width: '3rem', height: '3rem' }}
                 />
                 <img 
                   src={backBriefcaseIcon} 
                   alt="account" 
                   className="sidebar__account"
                   style={{ width: '3rem', height: '3rem' }} 
                 />
                 <button className="sidebar__mini-button">
                   <img src={searchIcon} alt="Search" style={{ width: '2.5rem', height: '2.5rem' }} />
                 </button>
               </div>
                                                       <div className="sidebar__mini-bar-bottom">
                 <img 
                   src={dashIcon} 
                   alt="separator" 
                   style={{ width: '1.5rem', height: '0.25rem', margin: '0.5rem auto', display: 'block' }} 
                 />
                <button className="sidebar__mini-button sidebar__mini-button--settings">
                  <img src={settingsIcon} alt="Settings" style={{ width: '2.5rem', height: '2.5rem' }} />
                </button>
                             <button className="sidebar__mini-button sidebar__mini-button--logout">
                   <img src={logoutIcon} alt="Logout" style={{ width: '2.5rem', height: '2.5rem' }} />
                 </button>
              </div>
        </div>
        
        {/* Sidebar navigation */}
        <div className="sidebar__navigation">
          <div>
            <div className="sidebar__header">
              <h1 className="sidebar__title">Oak Tree Cemetery</h1>
              <p className="sidebar__subtitle">Process Manager</p>
            </div>
            <hr className="sidebar__nav-separator" />
            <div className="sidebar__nav-buttons">
                               <button className="sidebar__nav-button sidebar__nav-button--active">
                   <img src={briefcaseIcon} alt="Organizations" style={{ width: '1.5rem', height: '1.5rem' }} />
                   <span>Organizations</span>
                 </button>
                <button className="sidebar__nav-button sidebar__nav-button--inactive">
                  <img src={hardHatIcon} alt="Contractors" style={{ width: '1.5rem', height: '1.5rem' }} />
                  <span>Contractors</span>
                </button>
                <button className="sidebar__nav-button sidebar__nav-button--inactive">
                  <img src={accountIcon} alt="Clients" style={{ width: '1.5rem', height: '1.5rem' }} />
                  <span>Clients</span>
                </button>
              </div>
          </div>
          <div className="sidebar__footer">
            All Funeral Services © 2015–2025
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 