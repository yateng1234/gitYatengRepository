<template lang="pug">
    d2-container.page
        d2-page-cover(title="I AM SUNTRAY ADMIN" sub-title="追求简约美感的系统集成方案")
            img(src="../../../public/image/logo-tx.png" alt="logo")
            template(slot="footer")

</template>


<script>
import D2HelpBtn from './components/d2-help-btn'
import D2Badge from './components/d2-badge'

export default {
  components: {
    D2HelpBtn,
    D2Badge
  }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/style/public.scss';

    .page {
        a {
            margin-left: 5px;
        }
        .page__btn-group {
            color: $color-text-placehoder;
            font-size: 12px;
            margin-top: -10px;
            margin-bottom: 20px;
            span {
                color: $color-text-sub;
                &:hover {
                    color: $color-text-main;
                }
            }
        }
    }
</style>
