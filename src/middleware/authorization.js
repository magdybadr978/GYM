
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../utils/ErrorHandling.js";
import { ErrorClass } from "../utils/ErrorClass.js";




export const isAuthorized = ( roles = [] ) => {
  return asyncHandler( async ( req, res, next ) => {
    if ( !roles.includes( req.user.role ) ) {
      return next( new ErrorClass( "not allow to you", StatusCodes.FORBIDDEN ) );
    }
    next();
  } );
};