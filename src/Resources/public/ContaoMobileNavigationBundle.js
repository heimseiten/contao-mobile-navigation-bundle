(function (root, factory) {

    root.js_mobile_navigation = factory()

}(this, function () {
    var options = {},
        defaults = {
            fullscreen: false,
            slide_from_left: false,
            css_path_main_nav_position: '',
            css_path_navicon_position: ''
        }
    function run(userOptions) {
        setOptions(userOptions)
        if (window.innerWidth < 1024 || options.fullscreen) { 
            switch_navigation_to_mobile() 
        } else { 
            add_EventListener_rezise()
        }
    }

    function switch_navigation_to_mobile() {
        if ( document.querySelector('.navicon') == null ) {
            document.querySelector(options.css_path_navicon_position).insertAdjacentHTML( 'beforeend',
                '<div class="navicon_wrapper"><div class="inside"><div class="navicon"><div class="inside"><div class="lines line_top"></div><div class="lines line_middle"></div><div class="lines line_bottom"></div></div></div>')
        }
        if ( document.querySelector(options.css_path_main_nav_position) ) {
            var copied_navigation = document.querySelector(options.css_path_main_nav_position).cloneNode(true)
        } else {
            console.log('No navigation was found at CSS path: '+options.css_path_main_nav_position)
            return
        }
        document.querySelector('body').insertAdjacentHTML( 'beforeend', '<div class="mobile_navigation_wrapper"></div>')
        document.querySelector('body > .mobile_navigation_wrapper').appendChild( copied_navigation )

        var original_height_header = document.querySelector("#header").offsetHeight
        document.querySelector('body > .mobile_navigation_wrapper > .mod_navigation').style.setProperty('--initial_header_height', original_height_header)
        document.querySelector('body > .mobile_navigation_wrapper > .mod_navigation').querySelectorAll('li.submenu').forEach( submenus => {
            submenus.insertAdjacentHTML('afterbegin','<div class="submenu_toggle"><span>'+ submenus.querySelector('ul').childElementCount +'</span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z"/></svg></div>')
            
            if (submenus.classList.contains('trail')) { toggle_open(submenus) }
                // BEGIN    - Optionen, die als Klasse in Seiteneigenschaften geschrieben werden können
            if (submenus.classList.contains('mn_open_submenu_in_mobile_nav')) { toggle_open(submenus) } 
            if (submenus.classList.contains('mn_remove_submenu_toggler')) { submenus.querySelector(':scope > .submenu_toggle').remove() }
            if (submenus.classList.contains('mn_only_toggle_submenu')) { }
                // END      - Optionen, die als Klasse in Seiteneigenschaften geschrieben werden können
        })
        if (options.fullscreen) {
            document.querySelector('body').classList.add('fullscreen_mobile_nav')
        }
        if (options.slide_from_left) {
            document.querySelector('body > .mobile_navigation_wrapper > .mod_navigation').classList.add('slide_from_left')
        }
        click_submenu_toggle()
        click_close()
    }

    function click_submenu_toggle() {
        document.addEventListener('click', e => {
            if( e.target.classList.contains('submenu_toggle') ) {
                var li = e.target.parentElement
                li.classList.toggle('open')
                li.querySelector(':scope > .submenu_toggle').classList.toggle('open')
                li.querySelector(':scope > ul').classList.toggle('open')
            }
        })
    }
    
    function add_EventListener_rezise() {
        window.addEventListener('resize', event => {
            if (window.innerWidth < 1024) { 
                if (document.querySelector('.navicon') == null) {
                    switch_navigation_to_mobile() 
                }
            }
        })
    }
    
    function click_close() {
        document.querySelector('.navicon').addEventListener('click', e => { 
            document.querySelector('html').classList.toggle('js_mobile_navigation_open')
        })
        if ( document.querySelector('body > .mobile_navigation_wrapper > .mod_navigation > .level_1') ) {
            document.querySelector('body > .mobile_navigation_wrapper > .mod_navigation > .level_1').addEventListener('click', e => { 
                if ( e.target.nodeName == 'A' || e.target.nodeName == 'STRONG' || e.target.nodeName == 'SPAN' ) {
                    document.querySelector('html').classList.toggle('js_mobile_navigation_open')
                }
            })
        }
    }

    function toggle_open(li) {
        li.classList.add('open') 
        li.querySelector(':scope > .submenu_toggle').classList.toggle('open')
        li.querySelector(':scope > ul').classList.toggle('open')
    }

    function setOptions(newOptions) {
        if (!newOptions) {
            newOptions = {}
        }
        // Fill options object
        for (var item in defaults) {
            options[item] = defaults[item]
            if (typeof newOptions[item] !== 'undefined') {
                options[item] = newOptions[item]
            }
        }
    }

    return {
        run: run
    }

}))
