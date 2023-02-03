import{PREFIX,OPEN_CLASS_NAME,FULL_DIMENSION_CLASS_NAME,FADE_IN_STRONG_CLASS_NAME}from"../cn/classes-names";import{setUpStageManager}from"./setUpStageManager";import{createSources}from"./sources/creating/createSources";import{renderSourceWrappersContainer}from"../cm/renderSourceWrappersContainer";import{renderNav}from"../cm/nav/renderNav";import{renderSlideButtons}from"../cm/renderSlideButtons";import{renderSlideSwipingHoverer}from"../cm/renderSlideSwipingHoverer";import{s}from"./s";import{gsw}from"./scrollbar/gsw";export function so(o){var{componentsServices,core:{eventsDispatcher,globalEventsController,scrollbarRecompensor,sourceDisplayFacade,stageManager,windowResizeActioner},data,elements,props,stageIndexes,sws}=o;o.open=(i=0)=>{var opi=stageIndexes.previous,oci=stageIndexes.current,oni=stageIndexes.next;stageIndexes.current=i;if(!data.i){setUpStageManager(o)}stageManager.updateStageIndexes();if(data.i){sws.c();sws.a();sws.b(opi);sws.b(oci);sws.b(oni);eventsDispatcher.dispatch("onShow")}else{ini()}stageManager.updateStageIndexes();sourceDisplayFacade.displaySourcesWhichShouldBeDisplayed();componentsServices.setSlideNumber(i+1);document.body.appendChild(elements.container);document.documentElement.classList.add(OPEN_CLASS_NAME);scrollbarRecompensor.addRecompense();globalEventsController.attachListeners();windowResizeActioner.runActions();elements.smw[stageIndexes.current].n();eventsDispatcher.dispatch("onOpen")};function ini(){data.i=true;data.scrollbarWidth=gsw(o);s(o);elements.container=document.createElement("div");elements.container.className=`${PREFIX}container ${FULL_DIMENSION_CLASS_NAME} ${FADE_IN_STRONG_CLASS_NAME}`;renderSlideSwipingHoverer(o);renderNav(o);renderSourceWrappersContainer(o);if(o.props.sources.length>1){renderSlideButtons(o);}createSources(o);eventsDispatcher.dispatch("onInit")}}
