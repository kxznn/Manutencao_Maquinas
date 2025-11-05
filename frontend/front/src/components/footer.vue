<template>
    <div class="Footer">
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
                <p><strong>Telefone:</strong> (19) 98765-0908</p>
                <p><strong>E-mail:</strong> system.maintenance@hotmail.com</p>
                <p><strong>Endereço:</strong> Rua das manutenções, 401. Campinas-SP</p>
                <p><strong>Telefone: (19) 98765-0908</strong></p>
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
export default {
    name: 'Footer',
    data() {
        return {
            currentYear: new Date().getFullYear()
        };
    }
}
</script>

<style scoped>
.Footer {
    background-color: rgb(6, 62, 77);
    color: #fff;
    padding-top: 1rem;
    font-size: 0.9rem;
    min-width: 100vh;
}

.footer-main {
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 2.5rem;
}

.footer-column a{
    text-decoration: none;
}
</style>