import {
  AccountCircle,
  CompareArrows,
  Favorite,
  ShoppingCart,
} from "@mui/icons-material";
import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  rgbToHex,
  Toolbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import logo from "../../../assets/logo.png";
import "./NavBar.css";

export default function Navbar() {
  const Sbtn = styled(Button)({
    backgroundColor: "#f50057",
  });
  return (
    <div className='nav'>
      <img src={logo} />
      <div className='input-group'>
        <div className='form-outline'>
          <input id='search-input' type='search' className='form-control' />
          <label className='form-label'>Search</label>
        </div>
        <button id='search-button' type='button' className='btn btn-primary'>
          <i className='fas fa-search' />
        </button>
      </div>
    </div>
    // <AppBar className='nav'>
    //   <Toolbar>
    //     <img src={logo} className='logo'></img>
    //     <div className='searchContainer'>
    //       <InputBase placeholder='Search...' fullWidth='true' sx={{ m: 1 }} />
    //       <Button variant='contained' size='small' sx={{ m: 1 }}>
    //         Search
    //       </Button>
    //     </div>
    //     <Sbtn variant='contained' size='small' sx={{ m: 1 }}>
    //       Seja um fornecedor
    //     </Sbtn>
    //     <div>
    //       <Button
    //         startIcon={<CompareArrows />}
    //         color='secondary'
    //         size='small'
    //         sx={{ m: 1 }}
    //       >
    //         Comparar produtos
    //       </Button>
    //       <Button
    //         startIcon={<Favorite />}
    //         color='secondary'
    //         size='small'
    //         sx={{ m: 1 }}
    //       >
    //         Favoritos
    //       </Button>
    //       <Button
    //         startIcon={<ShoppingCart />}
    //         color='secondary'
    //         size='small'
    //         sx={{ m: 1 }}
    //       >
    //         Cesto de compras
    //       </Button>
    //       <Button
    //         startIcon={<AccountCircle />}
    //         color='secondary'
    //         size='small'
    //         sx={{ m: 1 }}
    //       >
    //         Conta
    //       </Button>
    //     </div>
    //   </Toolbar>
    // </AppBar>
  );
}
