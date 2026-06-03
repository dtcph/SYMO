import {
  Component, ElementRef, HostListener, ViewChild,
  computed, input, output, signal,
} from '@angular/core';
import { PredefinedOption } from '../../../app/core/data/medical-info.data';
import { UserInfoItem } from '../../../app/core/state/session.store';

@Component({
  selector: 'symo-searchable-multiselect-dropdown',
  standalone: true,
  templateUrl: './searchable-multiselect-dropdown.component.html',
  styleUrls: ['./searchable-multiselect-dropdown.component.css'],
})
export class SearchableMultiselectDropdownComponent {
  // Inputs
  readonly options = input<PredefinedOption[]>([]);
  readonly value = input<UserInfoItem[]>([]);
  readonly placeholder = input('');
  readonly addLabel = input('Add');         // e.g. "Add custom"
  readonly emptyLabel = input('No results');
  readonly valueChange = output<UserInfoItem[]>();

  readonly open = signal(false);
  readonly query = signal('');

  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  readonly filtered = computed<PredefinedOption[]>(() => {
    const q = this.query().trim().toLowerCase();
    const selectedIds = new Set(this.value().map((v) => v.id));
    return this.options()
      .filter((o) => !selectedIds.has(o.id))
      .filter((o) => (q ? o.name.toLowerCase().includes(q) : true));
  });

  readonly showAddCustom = computed<boolean>(() => {
    const q = this.query().trim();
    if (!q) return false;
    const exactPredefined = this.options().some(
      (o) => o.name.toLowerCase() === q.toLowerCase(),
    );
    if (exactPredefined) return false;
    const alreadyCustom = this.value().some(
      (v) => v.custom && v.label.toLowerCase() === q.toLowerCase(),
    );
    return !alreadyCustom;
  });

  constructor(private host: ElementRef<HTMLElement>) {}

  addPredefined(opt: PredefinedOption): void {
    this.valueChange.emit([
      ...this.value(),
      { id: opt.id, label: opt.name, custom: false },
    ]);
    this.query.set('');
    setTimeout(() => this.searchInput?.nativeElement.focus(), 0);
  }

  addCustom(): void {
    const q = this.query().trim();
    if (!q) return;
    const id = 'custom-' + Math.random().toString(36).slice(2, 10);
    this.valueChange.emit([
      ...this.value(),
      { id, label: q, custom: true },
    ]);
    this.query.set('');
    setTimeout(() => this.searchInput?.nativeElement.focus(), 0);
  }

  remove(item: UserInfoItem): void {
    this.valueChange.emit(this.value().filter((v) => v.id !== item.id));
  }

  focusInput(): void {
    this.searchInput?.nativeElement.focus();
  }

  onFocus(): void { this.open.set(true); }

  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      const f = this.filtered();
      if (f.length > 0) {
        e.preventDefault();
        this.addPredefined(f[0]);
      } else if (this.showAddCustom()) {
        e.preventDefault();
        this.addCustom();
      }
    } else if (e.key === 'Backspace' && !this.query() && this.value().length > 0) {
      this.remove(this.value()[this.value().length - 1]);
    } else if (e.key === 'Escape') {
      this.open.set(false);
    }
  }

  @HostListener('document:mousedown', ['$event'])
  onDocClick(e: MouseEvent): void {
    if (!this.host.nativeElement.contains(e.target as Node)) {
      this.open.set(false);
    }
  }
}