import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
 
  {
    label: 'Grupos de Estudiantes',
    main: [
      {
        state: 'generargrupos',
        short_label: 'G',
        name: 'Generar grupos',
        type: 'link',
        icon: 'ti-user'
      },
      {
        state: 'mostrargrupos',
        short_label: 'M',
        name: 'Mostrar grupos',
        type: 'link',
        icon: 'ti-user'
      }
    ]
  },

  {
    label: 'Logeo y Registro ',
    main: [

      {
        state: 'login',
        short_label: 'L',
        name: 'Login',
        type: 'link',
        icon: 'ti-user',
        target: true
      },
      {
        state: 'registro',
        short_label: 'R',
        name: 'Registro',
        type: 'link',
        icon: 'ti-user',
        target: true
      },
      
      
    ]
  },
  
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
