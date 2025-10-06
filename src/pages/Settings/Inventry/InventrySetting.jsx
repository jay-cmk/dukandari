// // src/pages/InventorySettings.jsx
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { DefaultsSection } from "./defaultsSection/DefaultsSection";
// import { UnitOfMeasurementSection } from "./defaultsSection/UnitOfMeasurementSection";
// import { CategoryWiseVariantsSection } from "./defaultsSection/CategoryWiseVariantsSection";
// import IconHome from "@/components/HomeIcon/IconHome";
// import { Aside } from "@/components/aside/Aside";

// const InventorySettings = () => {
//   const [activeSection, setActiveSection] = useState("Defaults");

//   return (
//     <div className="p-4 min-h-screen bg-gray-200 ">
//       {/* Header */}
//       <div className="pb-2 flex items-center justify-between">
//         <div className="flex items-center gap-5">
//           <h1 className="text-2xl text-gray-500">Inventory Setting</h1>
//           <div className="h-6 w-px bg-gray-400"></div>
//           <div className="flex items-center gap-4">
//             <IconHome className="text-gray-500 w-8 h-8" />
//           </div>
//         </div>
//       </div>

//       {/* Layout */}
//       <div className="flex flex-row justify-center gap-3">
//         {/* Reusable Sidebar */}
//         <Aside active={activeSection} onSelect={setActiveSection} />

//         {/* Main Content */}
//         <main className="flex-1  space-y-4 bg-gray-200">
//           {activeSection === "Defaults" && <DefaultsSection />}
//           {activeSection === "Pricing" && <UnitOfMeasurementSection />}
//           {activeSection === "Stock" && <CategoryWiseVariantsSection />}
//           {/* You can add more sections later as needed */}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default InventorySettings;



// src/pages/InventorySettings.jsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DefaultsSection } from "./defaultsSection/DefaultsSection";
import { UnitOfMeasurementSection } from "./defaultsSection/UnitOfMeasurementSection";
import { CategoryWiseVariantsSection } from "./defaultsSection/CategoryWiseVariantsSection";
import IconHome from "@/components/HomeIcon/IconHome";
import { Aside } from "@/components/aside/Aside";

const InventorySettings = () => {
  const [activeSection, setActiveSection] = useState("Defaults");

  const menuItems = [
    "Defaults",
    "Pricing",
    "Stock",
    "Barcodes",
    "Production/Unit Conversions",
    "B2B",
  ];

  

  return (
    <div className="p-4  min-h-screen bg-gray-200">
      {/* Header */}
      <div className="pb-2 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <h1 className="text-2xl text-gray-500">Inventory Setting</h1>
          <div className="h-6 w-px bg-gray-400"></div>
          <IconHome className="text-gray-500 w-8 h-8" />
        </div>
      </div>

      {/* Layout */}
      <div className="flex flex-row gap-3 justify-center">
        {/* Reusable Aside */}
        <Aside
         
          items={menuItems}
          activeItem={activeSection}
          onSelect={setActiveSection}
        />

        {/* Main Content */}
        <main className="flex-1  space-y-4 bg-gray-200">
          { <DefaultsSection />}
          { <UnitOfMeasurementSection />}
          {<CategoryWiseVariantsSection />}
          {/* add more later */}
        </main>
      </div>
    </div>
  );
};

export default InventorySettings;
