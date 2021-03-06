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
      label: 'Usuarios',
      main: [

        {
          state: 'usuarios',
          short_label: 'U',
          name: 'Usuarios',
          type: 'link',
          icon: 'ti-id-badge'
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
        }
        // ,
        // {
        //   state: 'historialeventos',
        //   short_label: 'H',
        //   name: 'Historial de Eventos',
        //   type: 'link',
        //   icon: 'ti-clipboard'
        // }
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
      label: 'Registro',
      main: [

        {
          state: 'registro',
          short_label: 'R',
          name: 'Registro',
          type: 'link',
          icon: 'ti-eye',
          target: true
        }
        
        
      ]
    },
    
  ];

  const MENUITEMS2 = [
  
    {
      label: 'Eventos',
      main: [
        
        {
          state: 'eventos',
          short_label: 'E',
          name: ' Eventos',
          type: 'link',
          icon: 'ti-cup'
        }
        // ,
        // {
        //   state: 'historialeventos',
        //   short_label: 'H',
        //   name: 'Historial de Eventos',
        //   type: 'link',
        //   icon: 'ti-clipboard'
        // }
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
      label: 'Registro',
      main: [

       
        {
          state: 'registro',
          short_label: 'R',
          name: 'Registro',
          type: 'link',
          icon: 'ti-eye',
          target: true
        }
        
        
      ]
    },
    
  ];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    if(localStorage.getItem('rol') =="Administrador")
      return MENUITEMS;
    else
      return MENUITEMS2;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
