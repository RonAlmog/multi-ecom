"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { useDropdownPosition } from "./use-dropdown-position";
import SubcategoryMenu from "./subcategory-menu";
import { CustomCategory } from "../types";
import Link from "next/link";

interface Props {
  category: CustomCategory;
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getDropdownPosition } = useDropdownPosition(dropdownRef);

  const dropdownPosition = getDropdownPosition();

  const toggleDropdown = () => {
    if (category.subcategories?.docs?.length) {
      setIsOpen(!isOpen);
    }
  };

  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true);
    }
  };
  const onMouseLeave = () => setIsOpen(false);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={toggleDropdown}
    >
      <div className="relative">
        <Button
          asChild
          variant="elevated"
          className={cn(
            "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
            isActive && !isNavigationHovered && "bg-white border-primary",
            isOpen && "bg-white border-primary"
          )}
        >
          <Link
            prefetch
            href={`/${category.slug === "all" ? "/" : category.slug}`}
          >
            {category.name}
          </Link>
        </Button>
        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              "opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2",
              isOpen && "opacity-100"
            )}
          ></div>
        )}
      </div>
      <SubcategoryMenu
        category={category}
        isOpen={isOpen}
        position={dropdownPosition}
      />
    </div>
  );
};

export default CategoryDropdown;
