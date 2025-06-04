import { FetchAPI } from "../components/methods/fetch";
import { validateOrder, payOrder, billOrder } from "../constants/fetchMethods";

export const handleOrderValidation = async (validated: boolean, id_order: number) => {
  try {
    validateOrder.body.id_order = id_order;
    validateOrder.body.validated = validated;
    const response = await FetchAPI(validateOrder);
    console.log(response);
    window.location.reload(); // Refresh the page after the modification
    return response;
  } catch (error) {
    console.error("Erreur validation commande :", error);
    throw error; // pour que le composant appelant puisse gérer l'erreur
  }
};

export const handleOrderBilled = async (validated: boolean, id_order: number) => {
  try {
    if (!validated) {
      alert("La commande n'est pas encore validée et ne peut donc pas être facturée.");
      return;
    }
    validateOrder.body.id_order = id_order;
    const response = await FetchAPI(billOrder);
    console.log(response);
    window.location.reload(); // Refresh the page after the modification
    return response;
  } catch (error) {
    console.error("Erreur validation commande :", error);
    throw error; // pour que le composant appelant puisse gérer l'erreur
  }
};

export const handleOrderPayed = async (billed: boolean, id_order: number) => {
  try {
    if (!billed) {
      alert("La commande n'est pas encore facturée.");
      return;
    }
    payOrder.body.id_order = id_order;
    const response = await FetchAPI(payOrder);
    console.log(response);
    window.location.reload(); // Refresh the page after the modification
    return response;
  } catch (error) {
    console.error("Erreur validation commande :", error);
    throw error; // pour que le composant appelant puisse gérer l'erreur
  }
};
