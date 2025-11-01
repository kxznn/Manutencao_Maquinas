<template>
    <div class="footer">
        <div class="footer-main">
            <div class="footer-column">
                <ul>
                    <li><a href="#about"> Sobre nossa empresa </a></li>
                    <li><a href="#FAQ"> Perguntas Frequentes (FAQ) </a></li>
                    <li><a href="#terms"> Termos de Uso </a></li>
                    <li><a href="#priv"> Politca e Privacidade </a></li>
                </ul>
            </div>

            <div class="footer-column">
                <h3> ATENDIMENTOS </h3>
                <p><strong>Telefone: <strong> (19) 98765-0908 </strong></p>
                <p><strong>E-mail: <strong> system.maintenance@hotmail.com </strong></p>
                <p><strong>Endereço: <strong> Rua das manutenções, 401. Campinas-SP </strong></p>
                <p> Horario de Funcionamento: </p>
                <p>Seg. à Sex. das 08h às 17h </p>
            </div>

            <div class="footer-bottom">
                <p>
                    © {{ currentYear }} SysMaintenance. Todos os direitos reservados.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
const currentYear = ref(new Date().getFullYear());

export default {
    name: 'footer'
}
</script>

<style scoped>
.footer {
    background-color: black;
    color: #fff;
    padding-top: 2.5rem;
    font-size: 0.9rem;
}

.footer-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.2rem;

}
</style>