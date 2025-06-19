
import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { seances } from "@/data/seances";
import { Book, FileText, Home, Info, BookOpen, BarChart, Users } from "lucide-react";
import { Badge as UIBadge } from "@/components/ui/badge";
import { useProgress } from "@/contexts/ProgressContext";

export function NavigationBar() {
  const { getSeanceProgress } = useProgress();
  
  return (
    <nav className="bg-slate-100 py-4 border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className="flex items-center space-x-2 font-bold text-slate-900">
                <Home className="h-5 w-5" />
                <span>Accueil</span>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                <div className="flex items-center space-x-2">
                  <Book className="h-5 w-5" />
                  <span>Séances</span>
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {seances.map((seance) => {
                    const progress = getSeanceProgress(seance.id);
                    
                    return (
                      <li key={seance.id}>
                        <ListItem
                          title={`Séance ${seance.id}: ${seance.title}`}
                          href={seance.id === 1 ? "/seance1" : `/seance/${seance.id}`}
                        >
                          <div className="flex flex-col space-y-1">
                            <div>{seance.objectives.skill}</div>
                            {progress > 0 && (
                              <div className="flex items-center mt-1">
                                <UIBadge variant="secondary" className="text-xs">
                                  {progress}% complété
                                </UIBadge>
                              </div>
                            )}
                          </div>
                        </ListItem>
                      </li>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link 
                to="/contexte-historique" 
                className="flex items-center space-x-2 font-medium text-slate-700 hover:text-slate-900"
              >
                <Info className="h-5 w-5" />
                <span>Contexte historique</span>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link 
                to="/paroles" 
                className="flex items-center space-x-2 font-medium text-slate-700 hover:text-slate-900"
              >
                <FileText className="h-5 w-5" />
                <span>Paroles</span>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link 
                to="/dashboard" 
                className="flex items-center space-x-2 font-medium text-slate-700 hover:text-slate-900"
              >
                <BookOpen className="h-5 w-5" />
                <span>Tableau de bord</span>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link 
                to="/resources" 
                className="flex items-center space-x-2 font-medium text-slate-700 hover:text-slate-900"
              >
                <FileText className="h-5 w-5" />
                <span>Ressources</span>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link 
                to="/teacher" 
                className="flex items-center space-x-2 font-medium text-slate-700 hover:text-slate-900"
              >
                <BarChart className="h-5 w-5" />
                <span>Module enseignant</span>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
