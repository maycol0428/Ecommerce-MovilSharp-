import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useParams } from "react-router";
import { useGetProductQuery } from "../../services/product";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import MetaData from "../layout/MetaData";
import { Rating } from "@material-ui/lab";
import Loader from "../layout/Loader/Loader";
import useCounter from "../Hooks/useCounter";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../services/cart";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { newReview } from "../../app/features/review/reviewAction";
import ReviewCard from "./ReviewCard";
import {
  reset,
  resetError,
  reviewSelector,
} from "../../app/features/review/reviewSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { counter: quantity, increaseCounter, decreaseCounter } = useCounter(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data, error, isLoading, refetch } = useGetProductQuery(id);
  const { error: errorReview, loading, success } = useSelector(reviewSelector);
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    dispatch(newReview({ productId: id, comment, rating }));
    setOpen(false);
  };
  const addToCartHandler = () => {
    dispatch(addItemsToCart({ id, quantity }));
    alert.success("Item Added To Cart");
  };
  useEffect(() => {
    if (error) {
      alert.error(error.data.error);
    }
    if (errorReview) {
      alert.error(errorReview);
      dispatch(resetError());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch(reset());
      refetch();
    }
  }, [dispatch, error, alert, errorReview, success, refetch]);

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${data?.product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {data?.product.images &&
                  data?.product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{data?.product.name}</h2>
                <p>Product # {data?.product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating
                  size="large"
                  value={data?.product?.rating}
                  readOnly={true}
                  precision={0.5}
                  max={5}
                />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({data?.product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${data?.product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseCounter}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseCounter}>+</button>
                  </div>
                  <button
                    disabled={data?.product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b
                    className={
                      data?.product.Stock < 1 ? "redColor" : "greenColor"
                    }
                  >
                    {data?.product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{data?.product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e, newValue) => setRating(newValue)}
                name="unique-rating"
                value={rating}
                max={5}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <Button onClick={submitReviewToggle} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={reviewSubmitHandler} color="primary">
                    Submit
                  </Button>
                </>
              )}
            </DialogActions>
          </Dialog>

          {data?.product.reviews && data?.product.reviews[0] ? (
            <div className="reviews">
              {data?.product.reviews &&
                data?.product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
