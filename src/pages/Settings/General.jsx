// General.jsx
import React, { useState } from 'react';
import SettingsLayout from './SettingsLayout';
import UserRoles from './UserRoles'; // ADD THIS IMPORT

// Simple components for other menu items
const Profile = () => (
    <div>
        <h2>Profile Settings</h2>
        <p>This is the Profile section under General settings.</p>
        <div style={{ maxWidth: '500px' }}>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name</label>
                <input 
                    type="text" 
                    style={{ 
                        width: '100%', 
                        padding: '8px', 
                        border: '1px solid #ddd', 
                        borderRadius: '4px' 
                    }}
                    placeholder="Enter your name"
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
                <input 
                    type="email" 
                    style={{ 
                        width: '100%', 
                        padding: '8px', 
                        border: '1px solid #ddd', 
                        borderRadius: '4px' 
                    }}
                    placeholder="Enter your email"
                />
            </div>
            <button style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }}>
                Save Profile
            </button>
        </div>
    </div>
);

const Taxes = () => (
    <div>
        <h2>Taxes Settings</h2>
        <p>Tax configuration content goes here.</p>
    </div>
);

const ReportFormats = () => (
    <div>
        <h2>Report Formats</h2>
        <p>Report formats configuration content goes here.</p>
    </div>
);

const Prefix = () => (
    <div>
        <h2>Prefix Settings</h2>
        <p>Prefix configuration content goes here.</p>
    </div>
);

const PaymentTerms = () => (
    <div>
        <h2>Payment Terms</h2>
        <p>Payment terms configuration content goes here.</p>
    </div>
);

const AdditionalCharges = () => (
    <div>
        <h2>Additional Charges</h2>
        <p>Additional charges configuration content goes here.</p>
    </div>
);

const Hardware = () => (
    <div>
        <h2>Hardware Settings</h2>
        <p>Hardware configuration content goes here.</p>
    </div>
);

const ManageAccount = () => (
    <div>
        <h2>Manage Account</h2>
        <p>Account management content goes here.</p>
    </div>
);

const General = () => {
    const [activeMenu, setActiveMenu] = useState('General');

    const renderContent = () => {
        switch(activeMenu) {
            case 'General':
                return <Profile />;
            case 'Taxes':
                return <Taxes />;
            case 'Report Formats':
                return <ReportFormats />;
            case 'User Roles':
                return <UserRoles />; // Now this will work
            case 'Prefix':
                return <Prefix />;
            case 'Payment Terms':
                return <PaymentTerms />;
            case 'Additional Charges':
                return <AdditionalCharges />;
            case 'Hardware':
                return <Hardware />;
            case 'Manage Account':
                return <ManageAccount />;
            default:
                return <div>Content for {activeMenu}</div>;
        }
    };

    return (
        <SettingsLayout activeMenu={activeMenu} onMenuChange={setActiveMenu}>
            {renderContent()}
        </SettingsLayout>
    );
};

export default General;