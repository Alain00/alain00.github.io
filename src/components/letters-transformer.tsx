import { useLetterStore } from "@/zustand/letter-store"
import { nanoid } from "nanoid"
import React, { createElement, createRef, useEffect, useRef, type ReactElement } from "react"
import { Letter, type LetterRef } from "./letter"


export interface LettersProps {
  children: React.ReactNode
}

export const LettersTransformer = ({
  children
}: LettersProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const virtualParentRef = useRef<HTMLDivElement>(null)
  const letterStore = useLetterStore()


  const instanceLetter = (element: HTMLElement) => {
    const letterRef = createRef<LetterRef>()
    const letterElement = React.createElement(Letter, {
      key: nanoid(),
      ref: letterRef
    }, element.textContent)
    letterStore.addRenderComponent(letterElement)
    letterStore.addLetter(letterRef)
    
    return letterElement
  }

  const instanceContainer = (element: HTMLElement, props: Record<string, unknown>) => {
    const containerElement = React.createElement(element.tagName.toLowerCase(), {
      key: nanoid(),
      ...props
    })
    letterStore.addRenderComponent(containerElement)
    return containerElement
  }

  const transformElement = (element: HTMLElement, parent: HTMLElement | null, virtualParentRoot: HTMLElement): ReactElement[] => {
    let virtualParent: HTMLElement
    if (parent) {
      virtualParent = element.cloneNode() as HTMLElement
      parent.appendChild(virtualParent)
    } else {
      virtualParent = virtualParentRoot
    }

    const childrenReactElements: ReactElement[] = []
    if (element.childNodes.length > 0) {
      const children = element.childNodes

      for (let i = 0; i < children.length; i++) {
        const child = children[i]

        if (child.nodeType === Node.TEXT_NODE) {
          const textContent = child.textContent
          if (textContent && parent) {
            parent.style.display = 'inline'

            const letters = textContent.split(' ')
            const letterElements = letters.map((letter, index) => {
              const span = document.createElement('span')
              span.textContent = letter
              return span
            })

            letterElements.forEach((letterElement) => {
              const letterElementReact = instanceLetter(letterElement)
              childrenReactElements.push(letterElementReact)
              // virtualParent.appendChild(letterElement)
            })
          }
        } else {
          const children = transformElement(child as HTMLElement, virtualParent, virtualParentRoot)

          const childAsHTMLElement = child as HTMLElement
          const reactContainer = instanceContainer(
            child as HTMLElement, 
            { 
              children, 
              className: childAsHTMLElement.className, 
            }
          )
          childrenReactElements.push(reactContainer)
          // virtualParent.appendChild(child as HTMLElement)
        }
      }
    }
    return childrenReactElements
  }

  useEffect(() => {
    if (containerRef.current && virtualParentRef.current && containerRef.current.children.length > 0) {

      virtualParentRef.current.innerHTML = ''
      const container = containerRef.current
      const children = transformElement(container, null, virtualParentRef.current)

      virtualParentRef.current.style.display = 'none'
      const rootElement = createElement('div', { children })
      letterStore.setRootElement(rootElement)
    }
  }, [])

  return (
    <div>
      <div ref={containerRef} style={{ display: 'none' }}>
        {children}
      </div>
      {/* <LetterBlock> */}
      <div ref={virtualParentRef}></div>
      {/* </LetterBlock> */}

      {letterStore.rootElement}
    </div>
  )
}