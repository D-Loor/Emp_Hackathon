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
    label: 'Grupos',
    main: [
      {
        state: 'generargrupos',
        short_label: 'G',
        name: 'Conformar Grupos ',
        type: 'link',
        icon: 'ti-check-box'
      },
      {
        state: 'mostrargrupos',
        short_label: 'M',
        name: 'Mostrar Grupos',
        type: 'link',
        icon: 'ti-clipboard'
      }
    ]
  },
  {
    label: 'Estudiantes',
    main: [
      
      {
        state: 'estudiantes',
        short_label: 'E',
        name: 'Agregar Estudiante',
        type: 'link',
        icon: 'ti-user'
      },
      {
        state: 'mostrarestudiantes',
        short_label: 'H',
        name: 'Mostrar Estudiantes',
        type: 'link',
        icon: 'ti-clipboard'
      }
    ]
  },
  {
    label: 'Eventos',
    main: [
      
      {
        state: 'eventos',
        short_label: 'E',
        name: ' Eventos',
        type: 'link',
        icon: 'ti-cup'
      },
      {
        state: 'historialeventos',
        short_label: 'H',
        name: 'Historial de Eventos',
        type: 'link',
        icon: 'ti-clipboard'
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
