import angular from 'angular';
import { =ngmodule=Component } from './_ngmodule_.component';

export default angular.module('_ngmodule_', [

])
	.config(config)
	.directive(=ngmodule=Component.directiveSelector, () => =ngmodule=Component)
;
/* @ngInject */
function config () {

}