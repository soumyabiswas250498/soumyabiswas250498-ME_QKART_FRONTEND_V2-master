import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  Grid,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {


  return (
    
      <Card className="card" sx={{ m: 1 }} key={product._id}>
        <CardMedia sx={{ height: 240 }} component="img" src={product.image} alt={product.name} />
        <CardContent>
          <Typography gutterBottom variant="body1" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.cost}
          </Typography>
          <Rating name="read-only" value={product.rating} readOnly precision={0.5} />
        </CardContent>
        <CardActions>
          <Button className="btn-2" variant="contained" fullWidth startIcon={<AddShoppingCartOutlined />} onClick={handleAddToCart}>
            ADD TO CART
          </Button>
        </CardActions>
      </Card>
    
  );
};

export default ProductCard;
