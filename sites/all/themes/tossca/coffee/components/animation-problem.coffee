class AnimationProblem
  constructor: (@$wrapper) ->
    return unless @$wrapper

    _$figure = @$wrapper.find '.animation--problem-image'
    _currentLabel = null    
    _tlSetup = new TimelineMax
    _tlPipelines = new TimelineMax
      repeat: -1
    _tlMain = new TimelineMax
      paused: true
    _tlCompanyWarningHalo = new TimelineMax
      # yoyo: true
      repeat: -1


    _tlPipelines
      .to '.contribution-1 line', 0.5, {ease: Power0.easeNone, strokeDashoffset: -20}
      .to '.contribution-2 line', 0.5, {ease: Power0.easeNone, strokeDashoffset: -15}, '-=0.5'


    _tlSetup
      .to '#solution', 0, {opacity: 0}
      .to '#project-warning', 0, {opacity: 0}
      .to '#company-04-warning', 0, {opacity: 0}
      .to '#project-error', 0, {opacity: 0}
      .to '#problem .contract', 0, {drawSVG: 0}
      .to '#solution .contract', 0, {drawSVG: 0}
      .to '#solution .company', 0, {opacity: 0}
      .to '#contribution-tossca', 0, {opacity: 0}
      .to '.company-05-explosion', 0, {drawSVG: 0}
      # remove mask after setup all items
      .to '#mask', 0.8, {opacity: 0, delay: 0.4}

    
    _tlCompanyWarningHalo
      .to '#company-04-warning-halo', 0.5, {scale: 2.5, opacity: 0, ease: Power0.easeOut, transformOrigin:"50% 50%", delay: 0.6}
      .play()


    _tlMain
      .add('project')
      # show partners and contributions
      .staggerTo '#problem .partner', 0.2, {opacity: 1}, 0.1
      .add('project_end')


      .add('many_partners')
      # show all contracts
      .staggerTo '#problem .contract', 0.4, {drawSVG: '100%', ease: Power0.easeInOut}, 0.03
      .add('many_partners_end')


      .add('bad_commit')
      # hide inital partner and contracts
      .to '#partner-04-2 .company', 0.5, {opacity: 0}
      .to '#company-04-warning', 0.2, {opacity: 1}, '-=0.7'
      # original: #1da73e
      .to '#partner-04-2 .contribution-2 line', 0.4, {stroke: '#f952b6'}
      # original: #25b4af
      .to '#partner-04-2 .contribution-1 line', 0.4, {stroke: '#da4b50'}, '-=0.4'
      .to '#project-warning', 0.4, {opacity: 1}, '-=0.2'
      .add('bad_commit_end')


      .add('withdraw')
      # reset bad_commit
      .to '#partner-04-2 .company', 0.2, {opacity: 1}
      .to '#company-04-warning', 0.2, {opacity: 0}, '-=0.2'
      .to '#partner-04-2 .contribution-2 line', 0.2, {stroke: '#1da73e'}, '-=0.2'
      .to '#partner-04-2 .contribution-1 line', 0.2, {stroke: '#25b4af'}, '-=0.2'
      .to '#project-warning', 0.2, {opacity: 0}, '-=0.2'
      # hide partner 5 contribution
      .to '#company-05-explosion-foreground', 0.3, {fill: '#f952b6'}
      .to '#partner-05-2 .contribution', 0.2, {opacity: 0, delay: 0.2}
      # partner 5 explosion
      .to '#company-05-explosion-foreground', 0.3, {scale: 1.2, ease: Power0.easeOut, transformOrigin:"50% 50%"}
      .to '#company-05-explosion-foreground', 0.15, {scale: 0, ease: Power0.easeIn, transformOrigin:"50% 50%"}
      .to '#company-05-explosion-foreground-white', 0.6, {scale: 1.4, ease: Power0.easeOut, transformOrigin:"50% 50%"}, '-=0.2'
      .to '.company-05-explosion', 0.3, {drawSVG: '100%', ease: Power0.easeIn}, '-=0.4'
      .to '.company-05-explosion', 0.3, {opacity: 0, ease: Power0.easeIn}, '-=0.3'
      # hide all contracts and contributions
      .to '#problem .contract-company-05', 0.3, {opacity: 0, ease: Power0.easeIn}, '-=0.5'
      .to '#problem .contract', 0.3, {drawSVG: 0, ease: Power0.easeIn}, '-=0.3'
      .to '#project-error', 0.3, {opacity: 1, ease: Power0.easeInOut}, '-=0.3'
      .to '#problem .contribution-remaining', 0.3, {opacity: 0.2}
      .to '#problem .company', 0.3, {opacity: 0.2}, '-=0.3'
      .addCallback () ->
        _tlPipelines.pause()
      .add('withdraw_end')



      .add('tossca')
      .to '#problem .company', 0.2, {opacity: 0}
      .to '#problem .contribution-remaining', 0.2, {opacity: 0}, '-=0.2'
      .to '#project', 0.4, {y: -100}
      .to '#solution', 0.4, {opacity: 1}, '-=0.2'
      .staggerTo '#solution .company', 0.3, {opacity: 1, delay: 0.2}, 0.05
      .staggerTo '#solution .contract', 0.4, {drawSVG: '100%', delay: 0.2}, 0.05
      .addCallback () ->
        _tlPipelines.play()
      .to '#contribution-tossca', 0.4, {opacity: 1, delay: 0.2}
      .to '#project-error', 0.6, {opacity: 0, delay: 0.2}, '-=0.2'
      .add('tossca_end')




    $steps = jQuery ".animation--problem-step" 
    @waypoints_up = $steps.waypoint
      offset: '75%'
      handler: (direction) ->
        if direction == 'up'
          return
        _triggeredLabel = @.element.dataset.label
        _targetLabel = _triggeredLabel + '_end'        
        return unless _triggeredLabel != _currentLabel

        $steps.removeClass 'animation--is-active'
        $steps.filter(@.element).addClass 'animation--is-active'

        if _targetLabel
          _tlMain.tweenFromTo(_triggeredLabel, _targetLabel)
          _currentLabel = _triggeredLabel


    @waypoints_down = $steps.waypoint
      offset: '25%'
      handler: (direction) ->
        if direction == 'down'
          return

        _triggeredLabel = @.element.dataset.label
        _startLabel = _triggeredLabel
        _targetLabel = _triggeredLabel + '_end'
        return unless _triggeredLabel != _currentLabel

        $steps.removeClass 'animation--is-active'
        $steps.filter(@.element).addClass 'animation--is-active'

        if _targetLabel
          _currentLabel = _triggeredLabel
          _$figure.addClass 'animation--is-hidden'
          setTimeout ->
            _tlPipelines.play()
            _tlMain.time(_tlMain.getLabelTime(_targetLabel))
            _$figure.removeClass 'animation--is-hidden'
            _tlMain.tweenFromTo(_startLabel, _targetLabel)
          , 500


  destroy: ->
    _waypoints = @waypoints_up.concat(@waypoints_down)
    for _waypoint in _waypoints
      _waypoint.destroy()
    _waypoints = @waypoints_up = @waypoints_down = null



module.exports = class AnimationProblemWatcher
  constructor: (@selector) ->
    @instances = []
    @elements = jQuery @selector

    Breakpoints.on
      name: 'FROM_MOBILE_BREAKPOINT'
      matched: => @matched_tablet.apply(@, arguments)
      exit: => @exit_tablet.apply(@, arguments)

  matched_tablet: ->
    @elements.each (index, element) =>
      @instances[index] = new AnimationProblem jQuery(element)

  exit_tablet: ->
    return unless @instances.length
    for instance, index in @instances
      instance.destroy()
    @instances = []