(() => {
    let yOffset = 0 // window.pageYOffset
    let prevScrollHeight = 0
    let currentScene = 0 // 현재 활성화된(눈 앞에 보고 있는) scene(scroll-section)

    const sceneInfo = [
        {
            type: 'sticky',
            heightNum: 3,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),

                logo: document.querySelector('#scroll-section-0 .main-logo.one'),
                scroller: document.querySelector('#scroll-section-0 .page-footer'),

                messageTwo: document.querySelector('#scroll-section-0 .main-message.two'),
                messageThree: document.querySelector('#scroll-section-0 .main-message.three'),
                messageFour: document.querySelector('#scroll-section-0 .main-message.four'),
            },
            values: {
                logoOpacityIn: [0, 1, { start: 0.1, end: 0.2 }], // scroll 비율을 이용한 타이밍
                logoTranslateYIn: [20, 0, { start: 0.1, end: 0.2 }],
                logoOpacityOut: [1, 0, { start: 0.25, end: 0.3 }],
                logoTranslateYOut: [0, -20, { start: 0.25, end: 0.3 }],

                scrollerOpacityOut: [1, 0, { start: 0, end: 0.05}],
                
                messageTwoOpacityIn: [0, 1, { start: 0.3, end: 0.4 }],
                messageTwoTranslateYIn: [20, 0, { start: 0.3, end: 0.4 }],
                messageTwoOpacityOut: [1, 0, { start: 0.45, end: 0.5 }],
                messageTwoTranslateYOut: [0, -20, { start: 0.45, end: 0.5 }],

                messageThreeOpacityIn: [0, 1, { start: 0.5, end: 0.6 }],
                messageThreeTranslateYIn: [20, 0, { start: 0.5, end: 0.6 }],
                messageThreeOpacityOut: [1, 0, { start: 0.65, end: 0.7 }],
                messageThreeTranslateYOut: [0, -20, { start: 0.65, end: 0.7 }],

                messageFourOpacityIn: [0, 1, { start: 0.7, end: 0.8 }],
                messageFourTranslateYIn: [20, 0, { start: 0.7, end: 0.8 }],
                messageFourOpacityOut: [1, 0, { start: 0.85, end: 0.9 }],
                messageFourTranslateYOut: [0, -20, { start: 0.85, end: 0.9 }],
            }
        },
    ]

    function setLayout() {
        // 각 scroll section 의 높이 setting
        for (let i = 0; i < sceneInfo.length; i++) {
            if (sceneInfo[i].type === 'sticky') {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight // window.innerHeight 브라우저 창 높이
            } else if (sceneInfo[i].type === 'normal') {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
        }

        let totalScrollHeight = 0
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight
            if (totalScrollHeight >= pageYOffset) {
                currentScene = i
                break
            }
        }

        document.body.setAttribute('id', `show-scene-${currentScene}`)
    }

    function scrollLoop() {
        // 현재 보이는 scroll section
        prevScrollHeight = 0
        enterNewScene = false

        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight
        }

        if (yOffset < prevScrollHeight) {
            if (currentScene === 0) return // 브라우저 바운스 효과로 마이너스가 되는 것을 방지
            enterNewScene = true
            currentScene--
            document.body.setAttribute('id', `show-scene-${currentScene}`)
        }

        if (!sceneInfo[currentScene]) return
        
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true
            currentScene++
            document.body.setAttribute('id', `show-scene-${currentScene}`)
        }

        if (enterNewScene) return

        playAnimation()
    }


    function playAnimation() {
        const objs = sceneInfo[currentScene].objs
        const values = sceneInfo[currentScene].values
        const currentYOffset = yOffset - prevScrollHeight
        const scrollHeight = sceneInfo[currentScene].scrollHeight
        const scrollRatio = currentYOffset / scrollHeight

        switch (currentScene) {
            case 0:
                console.log('0 play')
                if (scrollRatio <= 0.22) {
                    // in
                    objs.logo.style.opacity = calcValues(values.logoOpacityIn, currentYOffset)
                    objs.logo.style.transform = `translate3d(0, ${calcValues(values.logoTranslateYIn, currentYOffset)}%, 0)`
                } else {
                    // out
                    objs.logo.style.opacity = calcValues(values.logoOpacityOut, currentYOffset)
                    objs.logo.style.transform = `translate3d(0, ${calcValues(values.logoTranslateYOut, currentYOffset)}%, 0)`
                }

                if (scrollRatio <= 0.42) {
                    // in
                    objs.messageTwo.style.opacity = calcValues(values.messageTwoOpacityIn, currentYOffset)
                    objs.messageTwo.style.transform = `translate3d(0, ${calcValues(values.messageTwoTranslateYIn, currentYOffset)}%, 0)`
                } else {
                    // out
                    objs.messageTwo.style.opacity = calcValues(values.messageTwoOpacityOut, currentYOffset)
                    objs.messageTwo.style.transform = `translate3d(0, ${calcValues(values.messageTwoTranslateYOut, currentYOffset)}%, 0)`
                }

                if (scrollRatio <= 0.62) {
                    // in
                    objs.messageThree.style.opacity = calcValues(values.messageThreeOpacityIn, currentYOffset)
                    objs.messageThree.style.transform = `translate3d(0, ${calcValues(values.messageThreeTranslateYIn, currentYOffset)}%, 0)`
                } else {
                    // out
                    objs.messageThree.style.opacity = calcValues(values.messageThreeOpacityOut, currentYOffset)
                    objs.messageThree.style.transform = `translate3d(0, ${calcValues(values.messageThreeTranslateYOut, currentYOffset)}%, 0)`
                }

                if (scrollRatio <= 0.82) {
                    // in
                    objs.messageFour.style.opacity = calcValues(values.messageFourOpacityIn, currentYOffset)
                    objs.messageFour.style.transform = `translate3d(0, ${calcValues(values.messageFourTranslateYIn, currentYOffset)}%, 0)`
                } else {
                    // out
                    objs.messageFour.style.opacity = calcValues(values.messageFourOpacityOut, currentYOffset)
                    objs.messageThree.style.transform = `translate3d(0, ${calcValues(values.messageFourTranslateYOut, currentYOffset)}%, 0)`
                }
                objs.scroller.style.opacity = calcValues(values.scrollerOpacityOut, currentYOffset)
                break
        }
    }

    function calcValues(values, currentYOffset) { // currentYOffset - 현재 scene 에서 얼마나 스크롤 되었는지 보는 값
        const scrollHeight = sceneInfo[currentScene].scrollHeight
        // 현재 scene 에서 스크롤 된 범위를 비율로 구하기
        const scrollRatio = currentYOffset / scrollHeight

        let rv
        if (values.length === 3) {
            // start ~ end 사이에 애니메이션 실행
            const elemScrollStart = values[2].start * scrollHeight
            const elemScrollEnd = values[2].end * scrollHeight
            const elemScrollHeight = elemScrollEnd - elemScrollStart
            const elemScrollRatio = (currentYOffset - elemScrollStart) / elemScrollHeight

            if (currentYOffset >= elemScrollStart && currentYOffset <= elemScrollEnd) {
                rv = elemScrollRatio * (values[1] - values[0]) + values[0]
            } else if (currentYOffset < elemScrollStart) {
                rv = values[0]
            } else if (currentYOffset > elemScrollEnd) {
                rv = values[1]
            }

        } else {
            rv = scrollRatio * (values[1] - values[0]) + values[0]
        }

        return rv
    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset
        scrollLoop()
    })
    window.addEventListener('load', setLayout) // content들 까지 loading 된 후 실행
    // window.addEventListener('DOMContentLoaded', setLayout) 실행 시점이 좀 더 빠름, DOM 객체가 loading 된 후
    window.addEventListener('resize', setLayout)
})()