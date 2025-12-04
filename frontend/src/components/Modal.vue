<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div 
        v-if="isOpen" 
        class="modal-overlay" 
        @click.self="handleOverlayClick"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? 'modal-title' : undefined"
      >
        <div 
          class="modal-container" 
          :class="[sizeClass, { 'modal-fullscreen': fullscreen }]"
          :style="{ maxWidth: customMaxWidth }"
        >
          <!-- Header -->
          <div v-if="showHeader" class="modal-header">
            <div class="modal-header-content">
              <slot name="header">
                <h3 v-if="title" id="modal-title" class="modal-title">
                  {{ title }}
                </h3>
                <h3 v-else class="modal-title">
                  <slot name="title">Título</slot>
                </h3>
              </slot>
            </div>
            
            <!-- Botões de controle -->
            <div class="modal-controls">
              <!-- Botão de tela cheia -->
              <button 
                v-if="allowFullscreen && !fullscreen" 
                @click="toggleFullscreen"
                class="modal-control-btn"
                aria-label="Expandir modal"
                title="Expandir"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
              </button>
              
              <!-- Botão de restaurar tela -->
              <button 
                v-if="allowFullscreen && fullscreen" 
                @click="toggleFullscreen"
                class="modal-control-btn"
                aria-label="Restaurar tamanho"
                title="Restaurar"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" />
                </svg>
              </button>
              
              <!-- Botão de fechar -->
              <button 
                v-if="showCloseButton" 
                @click="closeModal"
                class="modal-close-btn"
                aria-label="Fechar modal"
                title="Fechar"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Corpo/Conteúdo -->
          <div class="modal-body" :class="{ 'no-header': !showHeader, 'no-footer': !showFooter }">
            <div class="modal-scroll-content">
              <slot name="body">
                <div class="modal-default-content">
                  <p>Conteúdo do modal. Use slots para personalizar.</p>
                </div>
              </slot>
            </div>
          </div>

          <!-- Rodapé -->
          <div v-if="showFooter" class="modal-footer">
            <slot name="footer">
              <div class="modal-default-footer">
                <button 
                  v-if="showCancelButton"
                  @click="closeModal" 
                  class="modal-btn modal-btn-secondary"
                >
                  {{ cancelText }}
                </button>
                <button 
                  v-if="showConfirmButton"
                  @click="handleConfirm" 
                  class="modal-btn modal-btn-primary"
                  :disabled="confirmLoading"
                >
                  <span v-if="confirmLoading" class="flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processando...
                  </span>
                  <span v-else>{{ confirmText }}</span>
                </button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
defineOptions({
  name: 'AppModal'  // Nome multi-word
})

const props = defineProps({
  // Controle de abertura
  isOpen: {
    type: Boolean,
    default: false
  },
  
  // Título e conteúdo
  title: {
    type: String,
    default: ''
  },
  
  // Tamanho
  size: {
    type: String,
    default: 'md', // sm, md, lg, xl, full
    validator: (value) => ['sm', 'md', 'lg', 'xl', 'full', 'custom'].includes(value)
  },
  customMaxWidth: {
    type: String,
    default: null
  },
  
  // Controles visuais
  showHeader: {
    type: Boolean,
    default: true
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  showCloseButton: {
    type: Boolean,
    default: true
  },
  showCancelButton: {
    type: Boolean,
    default: true
  },
  showConfirmButton: {
    type: Boolean,
    default: true
  },
  
  // Textos dos botões
  cancelText: {
    type: String,
    default: 'Cancelar'
  },
  confirmText: {
    type: String,
    default: 'Confirmar'
  },
  
  // Comportamento
  closeOnOverlayClick: {
    type: Boolean,
    default: true
  },
  closeOnEsc: {
    type: Boolean,
    default: true
  },
  allowFullscreen: {
    type: Boolean,
    default: true
  },
  
  // Estado de carregamento
  confirmLoading: {
    type: Boolean,
    default: false
  },
  
  // Foco automático
  autoFocus: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits([
  'close', 
  'confirm', 
  'update:isOpen',
  'fullscreen-change'
])

// Estado interno
const fullscreen = ref(false)
const isClosing = ref(false)

// Classes computadas
const sizeClass = computed(() => {
  if (props.size === 'custom' || fullscreen.value) return ''
  
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
    full: 'max-w-4xl'
  }
  return sizes[props.size] || sizes.md
})

// Métodos
const closeModal = () => {
  isClosing.value = true
  emit('close')
  emit('update:isOpen', false)
  
  // Pequeno delay para permitir animação
  setTimeout(() => {
    isClosing.value = false
    fullscreen.value = false // Reset fullscreen ao fechar
  }, 300)
}

const handleConfirm = () => {
  if (!props.confirmLoading) {
    emit('confirm')
  }
}

const handleOverlayClick = () => {
  if (props.closeOnOverlayClick && !props.confirmLoading) {
    closeModal()
  }
}

const toggleFullscreen = () => {
  fullscreen.value = !fullscreen.value
  emit('fullscreen-change', fullscreen.value)
}

// Fechar com ESC
const handleKeydown = (event) => {
  if (props.isOpen && props.closeOnEsc && event.key === 'Escape' && !props.confirmLoading) {
    closeModal()
  }
  
  // Fechar com Enter no botão de fechar (acessibilidade)
  if (props.isOpen && event.key === 'Enter' && event.target.classList.contains('modal-close-btn')) {
    closeModal()
  }
}

// Bloquear scroll do body quando modal estiver aberto
const lockBodyScroll = () => {
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = '15px' // Compensar scrollbar
}

const unlockBodyScroll = () => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

// Observadores
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    lockBodyScroll()
    document.addEventListener('keydown', handleKeydown)
    
    // Foco automático no modal
    if (props.autoFocus) {
      setTimeout(() => {
        const modalElement = document.querySelector('.modal-container')
        if (modalElement) {
          modalElement.focus()
        }
      }, 50)
    }
  } else {
    unlockBodyScroll()
    document.removeEventListener('keydown', handleKeydown)
  }
})

// Lifecycle
onMounted(() => {
  if (props.isOpen) {
    lockBodyScroll()
    document.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  unlockBodyScroll()
  document.removeEventListener('keydown', handleKeydown)
})
</script>
