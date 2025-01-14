sap.ui.define([
		"sap/ui/base/Object"
	],
	function(SAPObject) {
		"use strict";

		var dataModel = SAPObject.extend(
			"co.com.postobon.js.DataModel", {
				metadata: {
					interfaces: []
				},

				constructor: function(oThis) {},

				/**
				 * Función de lectura de entidades
				 * @param {sap.ui.Model} oModelo Modelo sapui5
				 * @param {String} sEntidad Entidad a leer
				 * @param {Object} oFilters Object with filters data
				 * @returns {Object} Data resulting after read
				 * @private
				 */
				readEntitySync: function(oModelo, sEntidad, oFilters) {
					var mensaje;
					var fnSuccess = function(data, response) {
						mensaje = response;
					};
					var fnError = function(e) {
						mensaje = e;
					};
					oModelo.read(
						sEntidad, {
							context: null,
							filters: oFilters,
							success: fnSuccess,
							error: fnError,
							async: false,
							sorters: null,
							urlParameters: null
						});

					return mensaje;
				},

				/**
				 * Consumir servicio READ
				 * @public
				 * @param {object} pModel Modelo del Servicio Web
				 * @param {string} pEntidad Nombre de la entidad a consumir
				 * @param {object} pFilters Objeto con los filtros definidos
				 */
				fnReadEntityAsyn: function(oModelo, pEntidad, pFilters, oData) {
					try {

						var fnSucess = function(data, response) {
							oData.data = response;
						};
						var fnError = function(e) {
							oData.data = e;

						};

						// oModelo.read(pEntidad, null, pFilters, true, fnSucess, fnError);

						oModelo.read(
							pEntidad, {
								context: null,
								filters: pFilters,
								success: fnSucess,
								error: fnError,
								async: true,
								sorters: null,
								urlParameters: null
							});

					} catch (e) {
						oData.data = e;
					}

				},

				/**
				 * Consumir servicio CREATE.
				 * @public
				 * @param {object} pModelo hace referencia al modelo del servicio
				 * @param {string} pEntidad hace referencia a la entidad que se va a consumir
				 * @param {object} pDatoEndidad hace referencia a los dato a enviar a la entidad
				 * @returns {string} mensaje
				 */
				fnCreateEntity: function(pModelo, pEntidad, pData) {
					var mensaje = "";

					try {

						var fnSuccess = function(data, response) {
							mensaje.data = response;
						};
						var fnError = function(e) {
							mensaje.data = e;
						};

						//pModelo.create(pEntidad, pDatoEndidad, null, fnSucess, fnError, false);
						pModelo.create(pEntidad, pData, {
							context: null,
							success: fnSuccess,
							error: fnError,
							async: false
						});

						return mensaje;

					} catch (e) {
						mensaje = e;

						return mensaje;
					}
				},

				/**
				 * Consumir servicio CREATE.
				 * @public
				 * @param {object} pModelo hace referencia al modelo del servicio
				 * @param {string} pEntidad hace referencia a la entidad que se va a consumir
				 * @param {object} pDatoEndidad hace referencia a los dato a enviar a la entidad
				 * @returns {string} mensaje
				 */
				fnCreateEntityAsync: function(pModelo, pEntidad, oPostData, oData) {

					try {
						var fnSucess = function(data, response) {
							oData.data = response;
						};
						
						var fnError = function(e) {
							oData.data = e;
						};



						pModelo.create(pEntidad, oPostData, {
							context: null,
							success: fnSucess,
							error: fnError,
							async: true
						});



					} catch (e) {
					oData.data = e;
					}
				}
			});

		return dataModel;
	});