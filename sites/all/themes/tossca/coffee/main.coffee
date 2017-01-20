Modernizr = require './modernizr'
FastClick = require '../../../../../bower_components/fastclick/lib/fastclick.js'
Breakpoints = require '../../../../../bower_components/js-breakpoints/breakpoints.js'
InfieldLabel = require '../../../../../bower_components/jquery-infield-label/src/jquery.infieldlabel.js'
Waypoints = require '../../../../../bower_components/waypoints/lib/jquery.waypoints.js'

require "../../../../../bower_components/jquery.uniform/src/js/jquery.uniform.js"

Forms = require './components/forms'
Accordion = require './components/accordion'
Jumpmenu = require './components/jumpmenu'
Tabs = require './components/tabs'
Sticky = require './components/sticky'
AnimationProblem = require './components/animation-problem'
Roles = require './components/roles'
NavigationMobile = require './components/navigation-mobile'

Drupal.viewPort = ->
  viewPortWidth = undefined
  viewPortHeight = undefined
  
  # the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
  unless typeof window.innerWidth is "undefined"
    viewPortWidth = window.innerWidth
    viewPortHeight = window.innerHeight
  
  # IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
  else if typeof document.documentElement isnt "undefined" and typeof document.documentElement.clientWidth isnt "undefined" and document.documentElement.clientWidth isnt 0
    viewPortWidth = document.documentElement.clientWidth
    viewPortHeight = document.documentElement.clientHeight
  
  # older versions of IE
  else
    viewPortWidth = document.getElementsByTagName("body")[0].clientWidth
    viewPortHeight = document.getElementsByTagName("body")[0].clientHeight
  [
    viewPortWidth
    viewPortHeight
  ]

# Drupal.behaviors.preload =
#   attach: ->
#     setTimeout ->
#       jQuery('body').removeClass 'base--preload'
#     , 500


Drupal.behaviors.fastclick =
  attach: ->
    if Modernizr.touchevents
      FastClick(document.body)


Drupal.behaviors.accordion =
  attach: ->
    jQuery('.js--accordion').once 'accordion', () ->
      new Accordion('.js--accordion')


Drupal.behaviors.jumpmenu =
  attach: ->
    jQuery('.js--jumpmenu').once 'jumpmenu', () ->
      new Jumpmenu('.js--jumpmenu')


Drupal.behaviors.forms =
  attach: ->
    jQuery('form').once 'forms', () ->
      new Forms()


Drupal.behaviors.tabs =
  attach: ->
    jQuery('.js--tabs').once 'tabs', () ->
      new Tabs('.js--tabs')


Drupal.behaviors.sticky =
  attach: ->
    jQuery('.js--sticky').once 'sticky', () ->
      new Sticky('.js--sticky')


Drupal.behaviors.animation_problem =
  attach: ->
    jQuery('.js--animation-problem').once 'animation-problem', () ->
      new AnimationProblem('.js--animation-problem')


Drupal.behaviors.roles =
  attach: ->
    jQuery('.js--roles').once 'roles', () ->
      new Roles('.js--roles')


Drupal.behaviors.navigation_mobile =
  attach: ->
    jQuery('.js--navigation-mobile').once 'header', () ->
      new NavigationMobile('.js--navigation-mobile')