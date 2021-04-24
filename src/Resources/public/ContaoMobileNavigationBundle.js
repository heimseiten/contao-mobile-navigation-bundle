document.addEventListener("DOMContentLoaded", function(event) { 
    js_mobile_navigation.run({ })
})

(function (root, factory) {
    root.js_mobile_navigation = factory();
}(this, function () {
    var options = {},
        defaults = {
            menu_position_under_header: true,
            main_nav_position: '#header .mod_navigation',
            navicon_position: '#header .inside'
        };
    function run(userOptions) {
        setOptions(userOptions);
        if (window.innerWidth < 1024) { switch_navigation_to_mobile(); } else { add_EventListener_rezise(); }
    }

    function switch_navigation_to_mobile() {
        if (document.querySelector('.navicon') == null) {
            document.querySelector(options.navicon_position).insertAdjacentHTML( 'beforeend','<div class="navicon"><div class="icon navicon_to_closeicon"><div class="navicon_middle"></div></div></div>')
        }
        if (document.querySelector(options.main_nav_position)) {           
            document.querySelector('body').appendChild( document.querySelector(options.main_nav_position) );    
            var nav = document.querySelector('body > .mod_navigation');
            nav.querySelectorAll('li.submenu').forEach( submenus => {
                submenus.insertAdjacentHTML('afterbegin','<div class="submenu_toggle"><span>'+ submenus.querySelector('ul').childElementCount +'</span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z"/></svg></div>');
                
                if (submenus.classList.contains('trail')) { toggle_open(submenus); }
                    // BEGIN    - Optionen, die als Klasse in Seiteneigenschaften geschrieben werden können
                if (submenus.classList.contains('mn_open_submenu_in_mobile_nav')) { toggle_open(submenus); } 
                if (submenus.classList.contains('mn_remove_submenu_toggler')) { submenus.querySelector(':scope > .submenu_toggle').remove(); }
                if (submenus.classList.contains('mn_only_toggle_submenu')) { }
                    // END      - Optionen, die als Klasse in Seiteneigenschaften geschrieben werden können
            })
            if (options.menu_position_under_header) {
                document.querySelector('body > .mod_navigation > ul').style.top = document.querySelector('#header').offsetHeight + 'px';
            }
            click_submenu_toggle();
            click_close();
        }
    }

    function click_submenu_toggle() {
        document.addEventListener('click', e => {
            if( e.target.classList.contains('submenu_toggle') ) {
                var li = e.target.parentElement;
                li.classList.toggle('open');
                li.querySelector(':scope > .submenu_toggle').classList.toggle('open');
                li.querySelector(':scope > ul').classList.toggle('open');
            }
        })
    }
    
    function add_EventListener_rezise() {
        window.addEventListener('resize', event => {
            if (window.innerWidth < 1024) { 
                if (document.querySelector('.navicon') == null) {
                    switch_navigation_to_mobile(); 
                }
            }
        })
    }
    
    function click_close() {
        document.querySelector('.navicon').addEventListener('click', event => { 
            document.querySelector('body').classList.toggle('js_mobile_navigation_open')
        })
        if ( document.querySelector('body > .mod_navigation span.active, body > .mod_navigation strong.active') ) {
            document.querySelector('body > .mod_navigation span.active, body > .mod_navigation strong.active').addEventListener('click', event => { 
                document.querySelector('body').classList.toggle('js_mobile_navigation_open')
                document.querySelector('html').classList.toggle('js_mobile_navigation_open_html')
            })
        }
    }

    function toggle_open(li) {
        li.classList.add('open'); 
        li.querySelector(':scope > .submenu_toggle').classList.toggle('open');
        li.querySelector(':scope > ul').classList.toggle('open');
    }

    function setOptions(newOptions) {
        if (!newOptions) {
            newOptions = {};
        }
        // Fill options object
        for (var item in defaults) {
            options[item] = defaults[item];
            if (typeof newOptions[item] !== 'undefined') {
                options[item] = newOptions[item];
            }
        }
    }

    return {
        run: run
    };

}))