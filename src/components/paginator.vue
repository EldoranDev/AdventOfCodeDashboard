<template>
    <nav class="px-4 flex items-center justify-between sm:px-0">
    <div class="-mt-px w-0 flex-1 flex">
        <a
            href="#"
            class="border-b-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            @click="previous"
        >
            <!-- Heroicon name: solid/arrow-narrow-left -->
            <svg class="mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
            Previous
        </a>
    </div>
    <div class="hidden md:-mt-px md:flex">
        <template v-if="showMin">
            <a
                class="pagination__link"
                href='#'
                @click="navigate(min)"
            >
                {{ min + 1}}
            </a>
            <span class="pagination__seperator">...</span>
        </template>
        <a
            v-for="number in numbers"
            :key="number"
            :class='linkClass(number)'
            
            href='#'

            @click="navigate(number)"
        >
            {{ number + 1 }}
        </a>
        <template v-if="showMax">
            <span class="pagination__seperator">...</span>
            <a
                class="pagination__link"
                href='#'
                @click="navigate(max)"
            >
                {{ max + 1}}
            </a>
        </template>
    </div>
    <div class="-mt-px w-0 flex-1 flex justify-end">
        <a
            href="#"
            class="border-b-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            @click="next"
        >
        Next
        <!-- Heroicon name: solid/arrow-narrow-right -->
        <svg class="ml-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
        </a>
    </div>
    </nav>
</template>

<script>
export default {
    props: ['value', 'min', 'max', 'size'],
    methods: {
        previous() {
            this.$emit('input', Math.max(this.value - 1, this.min));
        },
        next() {
            this.$emit('input', Math.min(this.value + 1, this.max));
        },
        navigate(num) {
            this.$emit('input', num);
        }
    },
    computed: {
        linkClass() {
            return (number) => ({
                'pagination__link': true,
                'pagination__link--current': this.value === number
            });
        },
        range() {
            let from = this.value - (this.size / 2);
            let to = this.value + (this.size / 2);

            if (from < this.min) {
                to -= this.value - 1;
                from = 0;
            }

            if (to > this.max) {
                to = this.max;
            }

            return [from, to];
        },
        showMin() {
            return this.range[0] > this.min;
        },
        showMax() {
            return this.range[1] < this.max;
        },
        numbers() {
            let numbers = [];
            let range = this.range;

            for (let i = range[0]; i <= range[1]; i++) {
                numbers.push(i);
            }

            return numbers;
        }
    }
}
</script>

<style lang="postcss">
    .pagination__link {
        @apply border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 pt-4 px-4 inline-flex items-center text-sm font-medium;
    }

    .pagination__seperator {
        @apply border-transparent text-gray-500 border-b-2 pt-4 px-4 inline-flex items-center text-sm font-medium;
    }

    .pagination__link--current {
        @apply border-aoc-green text-aoc-green border-b-2 pt-4 px-4 inline-flex items-center text-sm font-medium;
    }
</style>