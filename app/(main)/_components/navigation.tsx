"use client";

import { Popover, PopoverContent } from "@/_components/ui/popover";
import { api } from "@/convex/_generated/api";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import { cn } from "@/lib/utils";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useMutation } from "convex/react";
import {
  ChevronLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import { NextPage } from "next";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import { DocumentList } from "./document-list";
import { Item } from "./item";
import { Navbar } from "./navbar";
import { TrashBox } from "./trash-box";
import { UserItem } from "./userItem";

interface NavigationProps {}

export const Navigation: NextPage<NavigationProps> = ({}) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const create = useMutation(api.documents.create);

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResettting, setIsResettting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const { onOpen } = useSearch();
  const { onOpen: onOpenSetting } = useSettings();

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resizeWidth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [isMobile, pathname]);

  const handleCreate = () => {
    const promise = create({ title: "New document" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );

    toast.promise(promise, {
      loading: "Creation du document...",
      success: "Document crée",
      error: "Erreur lors de a création du document",
    });
  };

  // Sur l'événement mouseDown, on ajoute les événements mouseMove et mouseUp
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Sur le déplacement de la souris lors du maintien du click, et si isResizing est vrai, on met à jour la largeur du sidebar
  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;
    // Je définis la largeur minimal et maximal du sidebar
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;
    // Si le sidebar et le navbar existent, je met à jour leur largeur
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };
  // Sur le relâchement du click, on met à jour isResizing.current à false et on supprime les événements mouseMove et mouseUp
  const handleMouseUp = (_event: MouseEvent) => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Si le sidebar et le navbar existent, on remet à jour les valeurs par default de la largeur du sidebar et du navbar
  const resizeWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResettting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );

      setTimeout(() => {
        setIsResettting(false);
      }, 300);
    }
  };

  // Si le sidebar et le navbar existent, on remet à jour les valeurs par default de la largeur du sidebar et du navbar
  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResettting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => {
        setIsResettting(false);
      }, 300);
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResettting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          role="button"
          className={cn(
            "h-6 -w-6  text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition ",
            isMobile && "opacity-100"
          )}
        >
          <ChevronLeft className="h-6 w-6" onClick={collapse} />
        </div>
        <div>
          <UserItem />
          <Item onClick={onOpen} label="Recherche" icon={Search} isSearch />
          <Item onClick={onOpenSetting} label="Paramètre" icon={Settings} />
          <Item
            onClick={handleCreate}
            label="Nouvelle page"
            icon={PlusCircle}
          />
        </div>
        <div className="mt-4">
          <DocumentList />
          <Item onClick={handleCreate} icon={Plus} label="Ajouter une page" />
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item icon={Trash} label="Corbeille" />
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-72"
              side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resizeWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 top-0 right-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResettting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resizeWidth} />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <MenuIcon
                role="button"
                className="h-6 w-6 text-muted-foreground"
                onClick={resizeWidth}
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};
