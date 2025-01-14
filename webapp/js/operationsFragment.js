sap.ui.define([
		"sap/ui/base/Object"
	],
	function (SAPObject) {
		"use strict";

		var OperationFragment = SAPObject.extend(
			"co.com.postobon.js.operationsFragment", {
				metadata: {
					interfaces: []
				},
				
				/**
				 * Abrir Fragment.
				 * 
				 * @public
				 * @param {sRutaFragment} ruta nombre fragment a abrir
				 * @param {that} variable de entorno del controllador, ya que en este js no existe
				 */
				fnOpenDialog: function(sRutaFragment, that) {
					that.oFragment = new Object();
					that.oFragment.view = null;

					this.fnLoadDialog(sRutaFragment, that.oFragment, that);
					that.oFragment.view.open();
					
					return Object.assign({}, that);
				},

				/**
				 * Instanciar Fragment.
				 * 
				 * @public
				 * @param {sRutaFragment} ruta nombre fragment a abrir 
				 * @param {objFragment} Objeto global contenedor del fragment
				 * @param {that} variable de entorno del controllador, ya que en este js no existe
				 */
				fnLoadDialog: function(sRutaFragment, objFragment, that) {
					if(!sRutaFragment){
						return; 
					}
					
					if (objFragment.view) {
						return;
					}
					// associate controller with the fragment
					objFragment.view = sap.ui.xmlfragment(sRutaFragment, that);
					that.getView().addDependent(objFragment.view);
				},

				/**
				 * Cerrar el fragment
				 * @public
				 * @param {that} variable de entorno del controllador, ya que en este js no existe 
				 */
				 fnCloseFragment: function(that) {
				 	if(typeof that.oFragment.view.close === "function"){
				 		that.oFragment.view.close();
				 	}
				 	
					this.fnCloseDialog(that.oFragment);
					delete that.oFragment;
				},

				/**
				 * Destruir Fragment.
				 * @public
				 * @param {objFragment} Objeto global contenedor del fragment
				 */
				fnCloseDialog: function(objFragment) {
					if (objFragment){
						objFragment.view.destroy();
					}
				}

			});
			
			return OperationFragment;

	});