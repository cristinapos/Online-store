$(function() {
    const propertiesContentWrapper = $('.content-wrapper');
    const list = $('.list');
    var json = JSON.stringify(products); 

    $.ajax({
        type: "GET",
        data: json,
        success: function() {
            propertiesContentWrapper.html('');
            list.html('');

            // nu ai nevoie sa creezi overlay-ul din js, acesta este corect sa existe deja in markup, nu sa il recreezi de fiecare data si apoi prin selectii doar sa ppopulezi informatiile dinamic
            let overLay = '<div class="overlay"><div class="overlay-content-wrapper"></div></div>';
            propertiesContentWrapper.append(overLay);
            
            for(let i = 0; i < Object.keys(products).length; i++) {
                let result = Object.keys(products)[i];

                let place = '<div class="content '+ result.trim() +'-container ' + result.trim() +' hidden" id="' + result.trim() +'-container '+ result.trim() +'">'
                            + '</div>';
                
                let listDates = '<li><a class="menu-item" data-content="'+result.trim() +'">' + result.trim() + '</a></li>';
                
                propertiesContentWrapper.append(place);
                list.append(listDates);
            //   ai foarte mult cod repetitiv, iar if else atat de mult ramificat de obicei nu este o solutie sustenabila
                    if($(place).hasClass('vases-container')) {
                        vases = $('.vases-container');
                        getPropertyHTML = function(propertyObj) {
                            return `<div class="single-property-wrapper" data-id=${propertyObj.id}>
                                        <img src="assets/vases/${propertyObj.imgUrl}" class="gallery-item"/>
                                        <div class="title-and-favorite-wrapper">
                                            <div class="title-wrapper">${propertyObj.series}</div>
                                            <div class="favorites-call-to-action">${propertyObj.currency}${propertyObj.price}</div>
                                        </div>
                                    </div>
                                `;
                        };
                        
                        for(let i = 0; i < products.vases.length; i++) {

                            let propertyObj = products.vases[i],
                            
                            propertyHTML = getPropertyHTML(propertyObj);
                                
                            vases.append(propertyHTML);

                           
                        }
                        
                    } else if($(place).hasClass('lamps-container')) {
                        lamps = $('.lamps-container');
                        getPropertyHTML = function(propertyObj) {
                            return `<div class="single-property-wrapper" data-id=${propertyObj.id}>
                                        <img src="assets/lamps/${propertyObj.imgUrl}" class="gallery-item"/>
                                        <div class="title-and-favorite-wrapper">
                                            <div class="title-wrapper">${propertyObj.series}</div>
                                            <div class="favorites-call-to-action">${propertyObj.currency}${propertyObj.price}</div>
                                        </div>
                                    </div>
                                `;
                        };
                        
                        for(let i = 0; i < products.lamps.length; i++) {
                            let propertyObj = products.lamps[i],
                                propertyHTML = getPropertyHTML(propertyObj);
                                
                            lamps.append(propertyHTML);
                        }  
                    } else if ($(place).hasClass('glasses-container')) {
                        glasses = $('.glasses-container');
                        getPropertyHTML = function(propertyObj) {
                            return `<div class="single-property-wrapper" data-id=${propertyObj.id}>
                                        <img src="assets/glasses/${propertyObj.imgUrl}" class="gallery-item"/>
                                        <div class="title-and-favorite-wrapper">
                                            <div class="title-wrapper">${propertyObj.series}</div>
                                            <div class="favorites-call-to-action">${propertyObj.currency}${propertyObj.price}</div>
                                        </div>
                                    </div>
                                `;
                        };
                        
                        for(let i = 0; i < products.glasses.length; i++) {
                            let propertyObj = products.glasses[i],
                                propertyHTML = getPropertyHTML(propertyObj);
                                
                            glasses.append(propertyHTML);
                        }  
                    } else {
                        accessories = $('.accessories-container');
                        getPropertyHTML = function(propertyObj) {
                            return `<div class="single-property-wrapper" data-id=${propertyObj.id}>
                                        <img src="assets/accessories/${propertyObj.imgUrl}" class="gallery-item"/>
                                        <div class="title-and-favorite-wrapper">
                                            <div class="title-wrapper">${propertyObj.series}</div>
                                            <div class="favorites-call-to-action">${propertyObj.currency}${propertyObj.price}</div>
                                        </div>
                                    </div>
                                `;
                        };
                        
                        for(let i = 0; i < products.accessories.length; i++) {
                            let propertyObj = products.accessories[i],
                                propertyHTML = getPropertyHTML(propertyObj);
                                
                            accessories.append(propertyHTML);
                        }  
                    }
                }

            $('.content-wrapper .content').first().removeClass('hidden');
            $('.list li a').first().addClass('selected');

            const menuItems = document.getElementsByClassName("menu-item");
                for(let i = 0; i < menuItems.length; i++) {
                const menuItem = menuItems[i];
                menuItem.addEventListener("click", function() {
                    for(let j = 0; j < menuItems.length; j++) {
                        menuItems[j].classList.remove("selected");
                        menuItems[j].parentNode.classList.remove("active");
                    }

                this.classList.add("selected");

                this.parentNode.classList.add('active')
                
                const dataContent = this.dataset.content;

                const contentElements = document.getElementsByClassName("content");
                for(let k = 0; k < contentElements.length; k++) {
                    contentElements[k].classList.add("hidden");
                }

                document.getElementsByClassName(dataContent)[0].classList.remove("hidden");
            })
            }

            vases = $('.vases-container');
                if (vases) {

                    const galleryItems = $('.gallery-item');
                        const overlay = $('.overlay');
                            galleryItems.click(function() {
                    
                                getPropertyHTML = function(propObj) {
                                    return `
                                            <img src="assets/vases/${propObj.imgUrl}" class="img-wrapper"/>`;
                                };
                                
                                for(let i = 0; i < products.vases.length; i++) {
                                    let propObj = products.vases[i];

                                    propHTML = getPropertyHTML(propObj);
                                    $('.overlay-content-wrapper').append(propHTML);
        
                                } 
                                overlay.fadeIn();
                            });

                            overlay.click(function() {
                                $(this).fadeOut();
                            });
    
                }
            
                            // imgWrapper.click(function(e) {
                            //         e.stopPropagation();
                            //     });
            
        },
        error: function() {
            propertiesContentWrapper.text("These has been a server error. Please try again later.");
        }
    });
})