window.addEventListener('load', (e) => {
    
    // Default value actions
    function DefValAct() {
        let tmDiv = document.querySelectorAll('.schdBlk')
        let TablesRow = document.querySelectorAll('table tr')
        if (tmDiv.length > 0) { 
            tmDiv.forEach(div => {
                if (div.parentElement.tagName.toLocaleLowerCase() === "td" && div.dataset.totalTime) {
                    let TdHe = div.parentElement.clientHeight;
                    let ttm = Number(div.dataset.totalTime) 
                    let stm = Number(div.dataset.startingTime) 
                    let heightCal = (TdHe / 60) * ttm - 5+"px"
                    let startPos  = (TdHe / 60) * stm +"px"
                    div.style.position = "absolute"
                    div.style.maxHeight = heightCal
                    div.style.height = heightCal
                    div.style.top = startPos
                }
            }) 
        }
        if (TablesRow.length > 0) { 
            let zIndexs = [];
            for (let i = 0; i < TablesRow.length; i++) {
                zIndexs.push(i)
            }
            let revrs = zIndexs.reverse()
            for (let index = 0; index < TablesRow.length; index++) {
                TablesRow[index].style.zIndex = revrs[index]
                TablesRow[index].style.position = "relative"
            }
        }
    }
    DefValAct()

    // Schedule
    function Schedule_of_other() {
        
        let mainBlks = document.querySelectorAll('.schedule-blk')
        mainBlks.forEach(bLk => {

            let dropHere = bLk.querySelectorAll('.schedule_tble tbody tr td') 

            // Move list from left side
            function AddScheduleFromLeft() { 
                let scLists  = bLk.querySelectorAll('.schedule_list_creats li')
                let storeBlock = [];
                scLists.forEach(ls => {
                    ls.addEventListener('dragstart', (e) => {
                        let target = e.target;
                        let spn = target.querySelectorAll('span')
                        storeBlock = [
                            spn[0].textContent.trim(),
                            spn[1].dataset.status,
                            Number(spn[1].dataset.started),
                            spn[1].dataset.startingTime,
                            Number(spn[1].dataset.total),
                            Math.random()
                        ]
                        bLk.classList.add('draggingFromLeft')
                    })
                    ls.addEventListener('dragend', (e) => {
                        console.log('drag end')
                        bLk.classList.remove('draggingFromLeft')
                    })
                }); 
                dropHere.forEach(drp => {
                    drp.addEventListener('dragover', (e) => {
                        e.preventDefault()
                        // console.log(e.target, 'dragover')
                    })
                    drp.addEventListener('dragenter', (e) => {
                        e.preventDefault()
                        let target = e.target;
                        if (target.tagName == "TD") { 
                            let catchRow = target.parentElement.querySelectorAll('td');
                            for (let i = 1; i < catchRow.length; i++) {
                                let Tds = catchRow[i]
                                if (Tds.querySelectorAll('.schdBlk').length > 0 && !Tds.classList.contains('disabled_blk')) {
                                    Tds.classList.add('backSoftYlw')
                                }else if (Tds.classList.contains('disabled_blk')) {
                                    Tds.classList.add('backSoftRed')
                                }
                                else{
                                    Tds.classList.add('backSoftGreen')
                                }
                            }  
                        }
                    })
                    drp.addEventListener('dragleave', (e) => {
                        e.preventDefault()
                        // console.log(e.target,'dragleave')
                        let target = e.target;
                        if (target.tagName == "TD") { 
                            let catchRow = target.parentElement.querySelectorAll('td');
                            for (let i = 1; i < catchRow.length; i++) {
                                let Tds = catchRow[i]

                                if (Tds.classList.contains('backSoftYlw')) {
                                    Tds.classList.remove('backSoftYlw')
                                }
                                if (Tds.classList.contains('backSoftGreen')) {
                                    Tds.classList.remove('backSoftGreen')
                                }
                                if (Tds.classList.contains('backSoftRed')) {
                                    Tds.classList.remove('backSoftRed')
                                } 
                            }  
                        } 
                    })
                    drp.addEventListener('drop', (e) => {
                        e.preventDefault() 
                        let target = e.target;
                        let catchRow = target.parentElement.querySelectorAll('td');
                        
                        if (target.querySelectorAll('.schdBlk').length > 0) {
                            $('#GroapViewMdl').modal('show'); 
                        } 
                        if (target.tagName == "TD" && !target.classList.contains('disabled_blk') && storeBlock.length > 0) {
                            let storeNums = [0];
                            let storeStar = [0];
                            let FindODv = target.querySelectorAll('.schdBlk')
                            let trFls = true;

                            CreateEventElement() 
                            function CreateEventElement() { 
                                
                                let Div = document.createElement('div')
                                let heightCal = (target.clientHeight / 60) * (storeBlock[4]-2) - 5
                                Div.classList.add('schdBlk')
                                Div.classList.add(storeBlock[1])
                                Div.setAttribute('data-bs-toggle',"modal")
                                Div.setAttribute('data-bs-target',"#GroapViewMdl")
                                Div.setAttribute('draggable',"true")
                                Div.setAttribute('id',"schdBlk")
                                Div.setAttribute('data-total-time',storeBlock[4])
                                Div.setAttribute('data-starting-time',storeBlock[2])
                                Div.style.position = "absolute",
                                Div.style.top = (target.clientHeight / 60) * storeBlock[2]+"px",
                                Div.style.height = heightCal+"px",
                                Div.style.maxHeight = heightCal+"px",
                                Div.style.boxShadow = "0px 5px 10px #00000014",
                                Div.innerHTML = `
                                    <div>${storeBlock[3]}</div>
                                    <span class="fcld">Lokaal</span>
                                    <b>${storeBlock[0]}</b>
                                    <span class="lcld">Teacher</span>
                                `
                                target.append(Div)
                                target.setAttribute('data-id',storeBlock[5]) 
                                if (heightCal <= 70 ) {
                                console.log(heightCal)
                                    Div.classList.add('smallest')
                                }

                            }  
                            storeNums = [];
                            
                            
                        } 
                  
                        if (target.tagName == "TD") { 
                            for (let i = 1; i < catchRow.length; i++) {
                                let Tds = catchRow[i]

                                if (Tds.classList.contains('backSoftYlw')) {
                                    Tds.classList.remove('backSoftYlw')
                                }
                                if (Tds.classList.contains('backSoftGreen')) {
                                    Tds.classList.remove('backSoftGreen')
                                }
                                if (Tds.classList.contains('backSoftRed')) {
                                    Tds.classList.remove('backSoftRed')
                                } 
                            }  
                        }
                        


                        storeBlock = [];
                    })
                })
            }
            AddScheduleFromLeft()


            // Change events into another
            function MoveScheduleIntoAnoter() {
                let dragable  = bLk.querySelectorAll('.schdBlk')
            
                let storDataHere   = [];

                // Drag the items
                dragable.forEach(item => {
                    item.addEventListener('dragstart', (e) => { 
                        let target = e.target;
                        let cln    = target.cloneNode(true)
                        storDataHere = [cln] 
                        target.parentElement.classList.add('dropped_this_into_another_schedule')
                    })
                    item.addEventListener('dragend', (e) => {
                        let target = e.target;  
                    })
                });


                dropHere.forEach(d_place => {
                    d_place.addEventListener('dragover', (e) => {
                        e.preventDefault()
                        let target = e.target;
                    
                    })
                    d_place.addEventListener('dragleave', (e) => {
                        let target = e.target;  
                    })
                    d_place.addEventListener('drop', (e) => {
                        let target = e.target; 
                        let DraggedElement = storDataHere[0]
                        if (storDataHere.length > 0) { 
                            
                                target.append(DraggedElement)
                            $('#GroapViewMdl').modal('show');
                        }  
                        storDataHere = []
                    })
                })
                    
            }
            MoveScheduleIntoAnoter()



        });
    }
    Schedule_of_other()

    // conflict
    function DropDownConflict() {
        let drps = document.querySelectorAll('.multiselect-dropdown')
        if (drps.length > 0) {
            let totalAvlNm = 0;
            drps.forEach(drp => {
                $('.multiselect-dropdown').on('DOMSubtreeModified', function(){
                    AddConfCls();
                });
                function AddConfCls() { 
                    let optexts = drp.querySelectorAll('.optext')
                    let opts = drp.querySelectorAll('.multiselect-dropdown-list label')
                    if (optexts.length > 0 && opts.length > 0) {
                        optexts.forEach(s_opt => {  
                            opts.forEach(n_opt => {
                                if (s_opt.textContent.toLocaleLowerCase() === n_opt.textContent.toLocaleLowerCase()) { 
                                    totalAvlNm = totalAvlNm + 1
                                }else{
                                    console.log('')
                                }
                            })
                            if (totalAvlNm > 1) { 
                                console.log(totalAvlNm)
                                s_opt.classList.add('conflict')
                            }else{
                                s_opt.classList.remove('conflict')
                            }
                            totalAvlNm = 0
                        }) 
                    }
                }
            })
        }
    }
    DropDownConflict()



})