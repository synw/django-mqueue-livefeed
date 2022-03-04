import { computed, ref, Ref } from "vue";
import { Message } from "djangoinstant";

export default class Site {
  name: string;
  messages: Ref<Array<Message>> = ref([]);
  numMessages = computed<number>(() => this.messages.value.length);

  constructor(name: string) {
    this.name = name;
  }

  get hasMessages(): boolean {
    return this.messages.value.length > 0;
  }
}

