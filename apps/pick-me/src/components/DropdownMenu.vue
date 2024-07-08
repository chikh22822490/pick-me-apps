<template>
  <span class="p-0">
    <span ref="activator">
      <slot name="activator" :show="show" :hide="hide" />
    </span>
    <span ref="content">
      <slot name="content" :hide="hide" />
    </span>
  </span>
</template>

<script setup lang="ts">
import tippy, { Instance, Props, Placement } from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'
import 'tippy.js/themes/light-border.css'
import { ref, onMounted } from 'vue'

const activator = ref<Element>()
const content = ref<Element>()

const props = withDefaults(
  defineProps<{
    persistent?: boolean
    placement?: Placement
    theme?: string
    class?: string
    arrow?: boolean
    offset?: [number, number]
    trigger?: 'click' | 'hover'
  }>(),
  {
    persistent: false,
    placement: 'right-start',
    theme: 'light-border',
    arrow: true,
    offset: () => [0, 0],
    trigger: 'click'
  }
)

const emit = defineEmits<{
  (e: 'hide'): void
  (e: 'show'): void
}>()

let tippyInstance: Instance<Props> | null = null

onMounted(() => {
  tippyInstance = tippy(activator.value as Element, {
    content: content.value,
    allowHTML: true,
    trigger: props.trigger === 'click' ? 'manual' : 'mouseenter focus',
    hideOnClick: true,
    popperOptions: {
      modifiers: [
        {
          name: 'preventOverflow'
        }
      ]
    },
    placement: props.placement,
    theme: props.theme,
    interactive: true,
    animation: 'shift-away',
    arrow: props.arrow,
    maxWidth: 'none',
    offset: props.offset,
    onHide: () => {
      emit('hide')
    },
    onShow: () => {
      emit('show')
    },
    plugins: [
      {
        name: 'hideOnEsc',
        defaultValue: true,
        fn({ hide }) {
          function onKeyDown(event: any) {
            if (event.keyCode === 27) {
              hide()
            }
          }
          return {
            onShow() {
              document.addEventListener('keydown', onKeyDown)
            },
            onHide() {
              document.removeEventListener('keydown', onKeyDown)
            }
          }
        }
      }
    ]
  })
})

function show() {
  tippyInstance?.show()
}

function hide() {
  tippyInstance?.hide()
}

defineExpose({
  hide,
  show
})
</script>

<style>
.tippy-content {
  padding: 0px;
}
</style>
