import { Category } from "@/payload-types";
import Link from "next/link";
import React from "react";
import { CustomCategory } from "../types";

interface Props {
  category: CustomCategory;
  isOpen: boolean;
  position: { top: number; left: number };
}

const SubcategoryMenu = ({ category, isOpen, position }: Props) => {
  if (
    !isOpen ||
    !category.subcategories ||
    category.subcategories.length === 0
  ) {
    return null;
  }

  const backgroundColor = category.color || "#F5F5F5";

  return (
    <div
      className="fixed z-100"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {/* invisible bridge */}
      <div className="h-3 w-60" />
      <div
        style={{
          backgroundColor,
        }}
        className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgb(0,0,0,1)] -translate-y-[2px]"
      >
        <div>
          {category.subcategories?.map((subcat: Category) => (
            <Link
              key={subcat.slug}
              href={`/${category.slug}/${subcat.slug}`}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium"
            >
              {subcat.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubcategoryMenu;
