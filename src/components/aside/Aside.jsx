// // src/components/layout/Sidebar.jsx
// import React from "react";
// import { Button } from "@/components/ui/button";

// export const Aside = ({
//   active = "Defaults",
//   items = ["Defaults", "Pricing", "Stock", "Barcodes", "Production/Unit Conversions", "B2B"],
//   onSelect,
// }) => {
//   return (
//     <aside className="w-60   space-y-2  ">
//       <nav className="flex flex-col space-y-1">
//         {items.map((item) => (
//           <Button
//             key={item}
//             variant={item === active ? "default" : "outline"}
//             className="w-full justify-start"
//             onClick={() => onSelect?.(item)}
//           >
//             {item}
//           </Button>
//         ))}
//       </nav>
//     </aside>
//   );
// };


// src/components/layout/Aside.jsx
import React from "react";
import { Button } from "@/components/ui/button";

export const Aside = ({
  items = [],
  activeItem,
  onSelect,
}) => {
  return (
    <aside className="w-60   space-y-2 ">


      {/* Navigation items */}
      <nav className="flex flex-col space-y-1">
        {items.map((item) => (
          <Button
            key={item}
            variant={item === activeItem ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => onSelect?.(item)}
          >
            {item}
          </Button>
        ))}
      </nav>
    </aside>
  );
};
