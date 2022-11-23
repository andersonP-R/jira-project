import { UIState } from "./";

// creamos los UIActionType para que el param "action" de nuestro reducer sepa que tipo de accion le estamos pasando. En este caso
// solo son dos. Esto se hace con la tuberia o pipe "|"

type UIActionType =
  | { type: "UI - Open Sidebar" }
  | { type: "UI - Close Sidebar" }
  | { type: "UI - Set isAddingEntry"; payload: boolean }
  | { type: "UI - Start Dragging" }
  | { type: "UI - End Dragging" };

// el reducer debe ser una función pura
export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  //
  // comprobamos el tipo de case (action)
  switch (action.type) {
    case "UI - Open Sidebar":
      //
      // hacemos spread del estado actual para poder devolver un nuevo estado. No es estado mutado, es un nuevo estado.
      return {
        ...state,
        sidemenuOpen: true,
      };

    case "UI - Close Sidebar":
      return {
        ...state,
        sidemenuOpen: false,
      };

    case "UI - Set isAddingEntry":
      return {
        ...state,
        isAddingEntry: action.payload,
      };

    case "UI - Start Dragging":
      return {
        ...state,
        isDragging: true,
      };

    case "UI - End Dragging":
      return {
        ...state,
        isDragging: false,
      };

    default:
      return state;
  }
};
