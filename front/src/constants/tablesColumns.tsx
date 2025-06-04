import { Column } from "../components/Table/types";
import { X, Eye } from "lucide-react";
import { OrderType, ClientType } from "../constants/types";
import { Check } from "lucide-react";
import { handleOrderValidation, handleOrderBilled, handleOrderPayed } from "../functiuns/order";

export const clientColumns: Column<ClientType>[] = [
  {
    key: "id_client",
    header: "",
    sortable: false,
    filterable: false,
    editable: false,
    render: (value) => (
      <a href={`/client/${value}`} className="hover:text-neutral-500 hover:font-semibold dark:hover:text-neutral-200">
        <Eye size={20} />
      </a>
    ),
    id_key: "id_client",
  },
  {
    key: "name",
    header: "Nom",
    sortable: true,
    filterable: true,
    editable: true,
    id_key: "id_client",
  },
  {
    key: "city",
    header: "Ville",
    sortable: true,
    filterable: true,
    editable: true,
    id_key: "id_client",
  },
  {
    key: "address",
    header: "Adresse",
    sortable: true,
    filterable: true,
    editable: true,
    id_key: "id_client",
  },
  {
    key: "post_code",
    header: "Code Postal",
    sortable: true,
    filterable: true,
    editable: true,
    id_key: "id_client",
  },
  {
    key: "tel",
    header: "Telephone",
    sortable: false,
    filterable: true,
    editable: true,
    id_key: "id_client",
  },
  {
    key: "mail",
    header: "Email",
    sortable: true,
    filterable: true,
    editable: true,
    id_key: "id_client",
  },
  {
    key: "siren",
    header: "SIREN",
    sortable: false,
    filterable: true,
    editable: true,
    id_key: "id_client",
  },
];

export const orderColumns: Column<OrderType>[] = [
  {
    key: "id_order",
    header: "",
    sortable: false,
    filterable: false,
    editable: false,
    render: (value) => (
      <a href={`/order/${value}`} className="hover:text-neutral-500 hover:font-semibold dark:hover:text-neutral-200">
        <Eye size={20} />
      </a>
    ),
    id_key: "id_order",
  },
  {
    key: "quote_number",
    header: "N° Devis",
    sortable: true,
    filterable: true,
    editable: false,
    id_key: "id_order",
  },
  {
    key: "paid",
    header: "Statut",
    sortable: true,
    filterable: true,
    editable: false,
    id_key: "id_order",
    render: (value, row) => (
      <>
        {row.validated ? (
          row.billed ? (
            value ? (
              <span className="text-green-700 bg-green-200 px-4 py-1 rounded-full">Payée</span>
            ) : (
              <span
                className="text-orange-700 bg-orange-200 px-4 py-1 rounded-full cursor-pointer"
                onClick={() => handleOrderPayed(row.validated, row.id_order)}
              >
                Facturée
              </span>
            )
          ) : (
            <span className="text-yellow-800 bg-yellow-200  px-4 py-1 rounded-full">En Cours</span>
          )
        ) : (
          <span className="text-neutral-800 bg-neutral-200 px-4 py-1 rounded-full">En attente</span>
        )}
      </>
    ),
  },
  {
    key: "client_name",
    header: "Client",
    sortable: true,
    filterable: true,
    editable: false,
    id_key: "id_order",
  },
  {
    key: "site_name",
    header: "Chantier",
    sortable: true,
    filterable: true,
    editable: true,
    id_key: "id_order",
  },
  {
    key: "contact_name",
    header: "Contact",
    sortable: true,
    filterable: true,
    editable: false,
    id_key: "id_order",
  },
  {
    key: "ordered_at",
    header: "Date commande",
    sortable: true,
    filterable: true,
    editable: true,
    id_key: "id_order",
  },
  {
    key: "object",
    header: "Objet",
    sortable: true,
    filterable: true,
    editable: true,
    id_key: "id_order",
  },
  {
    key: "site_address",
    header: "Adresse Chantier",
    sortable: true,
    filterable: true,
    editable: true,
    id_key: "id_order",
  },
  {
    key: "payement_date",
    header: "Date de paiement",
    sortable: true,
    filterable: true,
    editable: false,
    id_key: "id_order",
    render: (value, row) => <span className="w-full">{row.paid ? (value ? value : "") : "Impayé"}</span>,
  },
  {
    key: "price",
    header: "Prix",
    sortable: true,
    filterable: true,
    editable: true,
    id_key: "id_order",
    render: (value) => <span>{value == 0 ? "Indéfini" : `${value}€`}</span>,
  },
  {
    key: "deposit_rate",
    header: "Acompte",
    sortable: true,
    filterable: true,
    editable: false,
    id_key: "id_order",
    render: (value, row) => (
      <span>{value == 0 ? "" : `${value}% (${((Number(row.price) * Number(value)) / 100).toFixed(2)}€)`}</span>
    ),
  },
  {
    key: "reference",
    header: "Réf BT",
    sortable: true,
    filterable: true,
    editable: true,
    id_key: "id_order",
  },
  {
    key: "validated",
    header: "Etat",
    sortable: true,
    filterable: true,
    editable: false,
    id_key: "id_order",
    render: (value, row) => (
      <span
        onClick={() => handleOrderValidation(!value, row.id_order)}
        className="flex w-full h-full text-center justify-center items-center cursor-pointer"
      >
        {value ? <X color="red" /> : <Check color="green" />}
      </span>
    ),
  },
];
