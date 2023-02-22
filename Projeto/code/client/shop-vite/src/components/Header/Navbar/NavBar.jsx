import {AppBar, Toolbar, InputBase, Button, rgbToHex, IconButton,} from "@mui/material";
import logo from "../../../assets/logo.png";
import "./NavBar.css";
import { styled } from '@mui/material/styles';
import { AccountCircle,ShoppingCart, CompareArrows, Favorite} from '@mui/icons-material';


function Navbar() {
    
const Sbtn = styled(Button)({
    backgroundColor: '#f50057',
});
    return (
        <AppBar className="nav">
            <Toolbar>
                <img src={logo} className="logo"></img>
                <div className="searchContainer">
                    <InputBase placeholder="Search..." fullWidth='true' sx={{m:1}} />
                    <Button variant="contained" size="small" sx={{m: 1}}>Search</Button>
                </div>
                <Sbtn variant="contained" size="small" sx={{m: 1}}>Seja um fornecedor</Sbtn>
                <div>
                    <Button startIcon={<CompareArrows />} color='secondary' size="small" sx={{m: 1}}>Comparar produtos</Button>
                    <Button startIcon={<Favorite />} color="secondary" size="small" sx={{m: 1}}>Favoritos</Button>
                    <Button startIcon={<ShoppingCart />} color="secondary" size="small" sx={{m: 1}}>Cesto de compras</Button>
                    <Button startIcon={<AccountCircle />} color="secondary" size="small" sx={{m: 1}}>Conta</Button>

                    
                    
                </div>
                
            
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;