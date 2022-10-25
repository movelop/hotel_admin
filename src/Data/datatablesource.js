export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="flex items-center">
          <img className="w-[32px] h-[32px] rounded-full object-cover mr-[20px]" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          <span className="capitalize">{params.row.username}</span>
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
  {
    field: "isAdmin",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`p-[5px] rounded-sm ${params.row.isAdmin? 'bg-[#0080000d] text-green-700' : 'bg-[#0080000d] text-red-700'}`}>
          {params.row.isAdmin ? 'Admin' : 'Customer'}
        </div>
      );
    },
  },
];

export const facilityColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "img",
    headerName: "Image",
    width: 130,
    renderCell: (params) => {
      return (
        <div className="flex items-center">
          <img className="w-[32px] h-[32px] rounded-full object-cover mr-[20px]" src={params.row.img} alt="avatar" />
        </div>
      );
    },
  },
  {
    field: "title",
    headerName: "Facility",
    width: 230,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Room Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="flex items-center">
          <img className="w-[32px] h-[32px] rounded-full object-cover mr-[20px]" src={params.row.images ? params.row.images[0] : "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          <span className="capitalize">{params.row.title}</span>
        </div>
      );
    },
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];

export const bookingColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "lastname", headerName: "Last Name", width: 100,
  },
  {
    field: "email", headerName: "Email", width: 230,
  },
  {
    field: "phone", headerName: "Phone", width: 150,
  },
  {
    field: "roomTitle", headerName: "Room Title", width: 150,
  },
  {
    field: "price", headerName: "Price", width: 150,
  }, 
  {
    field: "paymentReference", headerName: "Payment Reference", width: 200,
    renderCell: (params) => {
      return (
        <div className="flex items-center">
          <span className="capitalize">{params.row.paymentReference || 'Cash Payment'}</span>
        </div>
      );
    },
  },
  {
    field: "confirmation", headerName: "Confirmation", width: 200,
  }
] 

export const transactionColumns = [
  {
    field: "confirmation", headerName: "Confirmation", width: 200,
  },
  {
    field: "lastname", headerName: "Last Name", width: 100,
  },
  {
    field: "email", headerName: "Email", width: 230,
  },
  {
    field: "phone", headerName: "Phone", width: 150,
  },
  {
    field: "roomTitle", headerName: "Room Title", width: 150,
  },
  {
    field: "price", headerName: "Price", width: 150,
  }, 
  {
    field: "paymentReference", headerName: "Payment Reference", width: 200,
    renderCell: (params) => {
      return (
        <div className="flex items-center">
          <span className="capitalize">{params.row.paymentReference || 'Cash Payment'}</span>
        </div>
      );
    },
  },
] 