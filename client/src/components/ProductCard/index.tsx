import * as React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";

import { Product } from "redux/slices/productsSlice";
import { themePalette } from "components/ThemeProvider";

type ProductObj = {
  product: Product;
};

function ProductCard({ product }: ProductObj) {
  let navigate = useNavigate();

  return (
    <ThemeProvider theme={themePalette}>
      <Card sx={{ maxWidth: 220, height: 360, margin: "auto" }}>
        <CardMedia
          component='img'
          height='220'
          image={product.img}
          alt={product.name}
        />
        <CardContent sx={{ padding: "10px" }}>
          <Typography
            align='center'
            gutterBottom
            component='div'
            sx={{ fontSize: "12px", marginTop: "4px", height: 40 }}>
            {product.name}
          </Typography>
          <Typography
            align='center'
            component='div'
            color='#00695c'
            sx={{ fontSize: "14px", marginTop: "4px", fontWeight: "600" }}>
            {product.price} €/pack
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            size='small'
            sx={{ color: "white" }}
            variant='contained'
            onClick={() => {
              navigate(`/product/${product._id}/`);
            }}>
            View detail
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}

export default ProductCard;
