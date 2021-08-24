import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import * as usuarioActions from '../actions/usuario.actions';
import { UsuarioService } from '../../services/usuario.service';
import { of } from "rxjs";

@Injectable()
export class UsauarioEffects{

    constructor( 
        private actions$: Actions,
        private usuarioService: UsuarioService
    ){  }

    cargarUsuario$ = createEffect( 
        () => this.actions$.pipe(
            ofType( usuarioActions.cargarUsuario ),
           // tap( data => console.log('effect tap ', data )),
            mergeMap( 
                ( action ) => this.usuarioService.getUserById( action.id )
                    .pipe(
             //           tap( data => console.log('getUsers effect ', data) )
                        map( user => usuarioActions.cargarUsuarioSuccess( { usuario: user} ) ),
                        catchError( err => of( usuarioActions.cargarUsuarioError( {payload: err} )))
                    )
             )
        )
     );

}
