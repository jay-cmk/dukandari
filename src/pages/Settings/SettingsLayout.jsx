// SettingsLayout.jsx
import React from 'react';

// Menu configuration - Exact order from image
export const menuItems = [
    'Profile',
    'Taxes',
    'Report Formats', 
    'User Roles',
    'Prefix',
    'Payment Terms',
    'Additional Charges',
    'Hardware',
    'Manage Account'
];

// Settings Layout Component
const SettingsLayout = ({ activeMenu, onMenuChange, children }) => {
    return (
        <div style={{ 
            padding: '20px', 
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f5f5f5',
            minHeight: '100vh'
        }}>
            {/* Main Container */}
            <div style={{
                display: 'flex',
                minHeight: 'calc(100vh - 40px)',
                gap: '20px'
            }}>
                {/* Left Navigation Menu - Exact match to image */}
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '0',
                    width: '240px',
                    height: 'fit-content',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }}>
                    {menuItems.map((item) => (
                        <button
                            key={item}
                            onClick={() => onMenuChange(item)}
                            style={{ 
                                cursor: 'pointer',
                                padding: '14px 20px',
                                border: 'none',
                                backgroundColor: item === activeMenu ? '#e8f0fe' : 'transparent',
                                color: item === activeMenu ? '#1a73e8' : '#3c4043',
                                fontWeight: item === activeMenu ? '500' : '400',
                                fontSize: '14px',
                                transition: 'all 0.2s ease',
                                borderLeft: item === activeMenu ? '4px solid #1a73e8' : 'none',
                                display: 'flex',
                                alignItems: 'center',
                                textAlign: 'left',
                                width: '100%',
                                fontFamily: 'inherit',
                                borderRadius: '0',
                                borderBottom: '1px solid #f1f3f4'
                            }}
                            onMouseEnter={(e) => {
                                if (item !== activeMenu) {
                                    e.target.style.backgroundColor = '#f8f9fa';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (item !== activeMenu) {
                                    e.target.style.backgroundColor = 'transparent';
                                }
                            }}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div style={{ 
                    flex: 1,
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    minHeight: '600px'
                }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SettingsLayout;